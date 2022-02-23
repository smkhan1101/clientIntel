import {SendQuestionnaire} from "../../models/send-questionnaire";

export class SetSendQuestionnaire {
  static readonly type = 'Set Send Questionnaire';

  constructor(public payload: SendQuestionnaire) {
  }
}

export class Clear {
  static readonly type = 'Clear Questionnaire State';

  constructor() {
  }
}
