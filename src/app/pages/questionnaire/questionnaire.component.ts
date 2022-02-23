import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {QuestionnaireService} from "../../services/questionnaire.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Questionnaire} from "../../models/questionnaire";
import {Subscription} from "rxjs";
import {TabsetComponent} from "ngx-bootstrap/tabs";
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {v4 as uuidv4} from 'uuid';
import {Field, Section, SendQuestionnaire} from "../../models/send-questionnaire";
import {Store} from "@ngxs/store";
import {Clear, SetSendQuestionnaire} from "../../store/actions/questionnaire.actions";

interface ITab {
  id: number;
  title: string;
  content: string;
  removable: boolean;
  disabled: boolean;
  active?: boolean;
  customClass?: string;
}

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('questionnaireTabSet') questionnaireTabSet!: TabsetComponent;
  @ViewChild('bodyPartsCanvas') bodyPartsCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;
  currentTabIndex = 0;
  currentActiveSectionId = 0;
  subscriptions: Subscription[] = [];
  questionnaireId: any;
  questionnaire: Questionnaire | undefined;
  progress: number = 0;
  multiplierFactor: number = 0;
  tabs: ITab[] = [];
  questionnaireFormGroup!: FormGroup;
  isSaving: boolean[] = [];
  submittedForms: { id: number, isDone: boolean }[] = [];
  uuid: any;
  sendQuestionnaire: SendQuestionnaire | undefined;
  isShowFinalResponse: boolean = false;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private questionnaireService: QuestionnaireService
  ) {
  }

  get currentFormGroup(): FormGroup {
    return this.questionnaireFormGroup.get(this.currentActiveSectionId.toString()) as FormGroup;
  }

  ngOnInit(): void {
    this.uuid = uuidv4();
    this.sendQuestionnaire = new SendQuestionnaire();

    this.questionnaireFormGroup = this.fb.group({});
    this.updateProgressBar();

    const paramMapSubscription = this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.questionnaireId = params.get('id');
        this.loadQuestionnaire();
      }
    });
    this.subscriptions.push(paramMapSubscription);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.bodyPartsCanvas && this.bodyPartsCanvas.nativeElement) {
        this.ctx = this.bodyPartsCanvas.nativeElement.getContext('2d');
      }
    }, 1000);
  }

  isFormDone(id: number) {
    const submittedForm = this.submittedForms.find(x => x.id === id);
    return submittedForm ? submittedForm.isDone : false;
  }

  loadQuestionnaire() {
    const questionnaireSubscription = this.questionnaireService.getQuestionnaire(this.questionnaireId)
      .subscribe(questionnaire => {
        console.log(questionnaire);
        this.questionnaire = questionnaire;
        this.prepareTabs();
        this.prepareSavingFlags();
        this.prepareFormGroup();
      });
    this.subscriptions.push(questionnaireSubscription);
  }

  prepareTabs() {
    if (this.questionnaire) {
      this.questionnaire.sections.forEach(section => {
        if (!this.tabs) {
          this.tabs = [];
        }
        this.tabs.push({
          id: section.id,
          title: section.name,
          content: section.name,
          removable: false,
          disabled: false,
          active: false,
          customClass: 'active'
        });
        this.submittedForms.push({
          id: section.id,
          isDone: false
        });
      });
      if (this.tabs) {
        this.tabs[0].active = true;
        this.currentActiveSectionId = this.tabs[0].id;
        this.currentTabIndex = 0;
        this.updateProgressBarMultiplierFactor();
        this.updateProgressBar();
      }
    }
  }

  updateProgressBarMultiplierFactor() {
    this.multiplierFactor = 100 / this.tabs.length;
  }

  updateProgressBar() {
    const progressValue = this.multiplierFactor * (this.currentTabIndex);
    this.progress = progressValue > 0 ? progressValue : 4.6;
  }

  prepareSavingFlags() {
    this.tabs.forEach(tab => this.isSaving.push(false));
  }

  prepareFormGroup() {
    if (this.questionnaire && this.questionnaireFormGroup) {
      this.questionnaire.sections.forEach(section => {
        const formGroup = this.fb.group({});
        section.fields.forEach(field => {
          const formControl = this.fb.control(null);
          if (field.required) {
            formControl.addValidators(Validators.required);
            formControl.updateValueAndValidity();
          }
          if (field.answer_type === 'email') {
            formControl.addValidators(Validators.email);
            formControl.updateValueAndValidity();
          }

          formGroup.addControl(field.id.toString(), formControl);
        });

        this.questionnaireFormGroup.addControl(section.id.toString(), formGroup)
      });

      console.log(this.questionnaireFormGroup.controls);
    }
  }

  onTabChange(tabIndex: number) {
    if (this.tabs && this.isFormDone(this.currentActiveSectionId)) {
      setTimeout(() => {
        this.tabs[tabIndex].active = true;
      }, 500);
      this.currentActiveSectionId = this.tabs[tabIndex].id;
      this.currentTabIndex = tabIndex;
      // this.updateProgressBar();
    }
  }

  hasErrors(formControlName: string): ValidationErrors | null {
    const formGroup = this.currentFormGroup;
    if (formGroup.touched && this.isSaving[this.currentTabIndex]) {
      const formControl = formGroup.get(formControlName) as FormControl;
      return formControl.errors;
    }
    return null;
  }

  onMoveToPreviousTab() {
    if (this.currentTabIndex > 0) {
      this.currentTabIndex -= 1;
      this.currentActiveSectionId = this.tabs[this.currentTabIndex].id;
      this.onTabChange(this.currentTabIndex);
    }
  }

  onMoveToNextTab() {
    this.isSaving[this.currentTabIndex] = true;
    if (this.currentFormGroup.touched && this.currentFormGroup.valid) {
      if (this.currentTabIndex < this.tabs.length) {
        this.saveForm(false);
        this.currentTabIndex += 1;
        this.currentActiveSectionId = this.tabs[this.currentTabIndex].id;
        this.onTabChange(this.currentTabIndex);
      }
    }
  }

  mapToController(event: any, formControlName: any) {
    console.log(event);
    const formControl = this.currentFormGroup.get(formControlName) as FormControl;
    formControl.patchValue('File');
  }

  onCanvasClick(event: any) {
    console.log(event);
    this.drawCross(event.offsetX, event.offsetY);
  }

  drawCross(xAxis: number, yAxis: number) {
    if (this.ctx) {
      this.ctx.font = "30px Comic Sans MS";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("X", xAxis, yAxis);
    }
  }

  clearCanvas() {
    this.ctx?.clearRect(0, 0, this.bodyPartsCanvas.nativeElement.width, this.bodyPartsCanvas.nativeElement.height);
  }

  saveForm(isFinalized: boolean) {
    this.submittedForms[this.currentTabIndex].isDone = true;
    const body = this.prepareBody(isFinalized);
    this.store.dispatch(new SetSendQuestionnaire(body));
    this.questionnaireService.saveForm(JSON.stringify(body)).subscribe(res => {
      this.updateProgressBar();
      console.log(res)
      if (isFinalized) {
        this.store.dispatch(new Clear());
        this.isShowFinalResponse = true;
      }
    });
  }

  prepareBody(isFinalized: boolean): SendQuestionnaire {
    const formValue = this.currentFormGroup.value;
    const keys = Object.keys(formValue);
    const values = Object.values<any>(formValue);
    if (!this.sendQuestionnaire) {
      this.sendQuestionnaire = new SendQuestionnaire();
    }
    this.sendQuestionnaire.uuid = this.uuid;
    this.sendQuestionnaire.project_id = this.questionnaireId;
    this.sendQuestionnaire.status = isFinalized ? 1 : 0;
    const section = new Section();
    section.id = this.currentActiveSectionId;
    const fields: Field[] = [];
    for (let i = 0; i < keys.length; i++) {
      const field = new Field();
      field.id = +keys[i];
      field.value = values[i];
      fields.push(field);
    }
    section.fields = [...fields];
    this.sendQuestionnaire.sections = [...this.sendQuestionnaire.sections, section];
    return this.sendQuestionnaire;
  }

  onSubmit() {
    this.saveForm(true);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
