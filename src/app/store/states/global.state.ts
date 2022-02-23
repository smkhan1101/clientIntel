import {State, Action, StateContext, Selector} from '@ngxs/store';

import {Injectable} from '@angular/core';

export class GlobalStateModel {
}

const defaultState = {};

@State<GlobalStateModel>({
  name: 'globalState',
  defaults: defaultState
})
@Injectable()
export class GlobalState {

}
