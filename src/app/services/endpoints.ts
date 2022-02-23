import {environment} from "../../environments/environment";

export class Endpoints {
  static GET_QUESTIONNAIRE_URL = `${environment.apiUrl}api/questionnaire`;
  // todo: change this URL once the get is also fixed
  static SAVE_QUESTIONNAIRE_URL = `https://myonedx.com/services/cintel/responses`;
}
