import { GlobalState } from './global.state';

export interface AppState {
  globalState: GlobalState;
}

export const appState = [GlobalState];
