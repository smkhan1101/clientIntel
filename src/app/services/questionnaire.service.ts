import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Endpoints} from "./endpoints";
import {Questionnaire} from "../models/questionnaire";

@Injectable()
export class QuestionnaireService {

  getQuestionnaire(id: any): Observable<Questionnaire> {
    return this.httpClient.get<Questionnaire>(`${Endpoints.GET_QUESTIONNAIRE_URL}/${id}`);
  }

  constructor(private httpClient: HttpClient) {
  }

  saveForm(body: any): Observable<any> {
    return this.httpClient.post(Endpoints.SAVE_QUESTIONNAIRE_URL, body, {
      headers: {'Content-Type': 'application/json'}
    })
  }
}
