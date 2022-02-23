import {State, Action, StateContext, Selector} from '@ngxs/store';

import {Injectable} from '@angular/core';
import {SendQuestionnaire} from "../../models/send-questionnaire";
import {Clear, SetSendQuestionnaire} from "../actions/questionnaire.actions";

export class QuestionnaireStateModel {
  sendQuestionnaire: SendQuestionnaire | undefined;
  questionnaireFormGroup: {
    model: undefined,
    dirty: false,
    status: '',
    errors: {}
  } | undefined;
}

const defaultState = {
  sendQuestionnaire: new SendQuestionnaire(),
  questionnaireFormGroup: undefined
};

@State<QuestionnaireStateModel>({
  name: 'questionnaireState',
  defaults: defaultState
})

@Injectable()
export class QuestionnaireState {
  @Action(SetSendQuestionnaire)
  setSendQuestionnaire(ctx: StateContext<QuestionnaireStateModel>, {payload}: SetSendQuestionnaire) {
    ctx.setState({...ctx.getState(), sendQuestionnaire: payload});
  }

  @Action(Clear)
  clear(ctx: StateContext<QuestionnaireStateModel>, {}: Clear) {
    ctx.patchState(defaultState);
  }
}
