import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionnaireComponent} from './questionnaire.component';
import {QuestionnaireRoutingModule} from "./questionnaire-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {QuestionnaireService} from "../../services/questionnaire.service";
import {ProgressbarModule} from "ngx-bootstrap/progressbar";
import {TabsModule} from "ngx-bootstrap/tabs";
import {MatButtonModule} from "@angular/material/button";
import {NgxMaskModule} from "ngx-mask";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {FileUploadModule} from "primeng/fileupload";
import {NgxsFormPluginModule} from "@ngxs/form-plugin";
import {NgxsModule} from "@ngxs/store";
import {QuestionnaireState} from "../../store/states/questionnaire.state";
import {environment} from "../../../environments/environment";


@NgModule({
  declarations: [
    QuestionnaireComponent
  ],
  imports: [
    CommonModule,
    QuestionnaireRoutingModule,
    ReactiveFormsModule,
    ProgressbarModule,
    TabsModule,
    MatButtonModule,
    NgxMaskModule,
    BsDatepickerModule,
    FileUploadModule,
    NgxsModule.forFeature([QuestionnaireState]),
    NgxsFormPluginModule
  ],
  providers: [
    QuestionnaireService
  ]
})
export class QuestionnaireModule {
}
