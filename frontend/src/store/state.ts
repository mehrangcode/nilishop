

import { IAuthState } from '../actions/Auth/model';
import { IPanelState } from '../actions/Panel/model';
export interface IApplicationState {
    auth: IAuthState,
    panel: IPanelState
}

export type AppAction<TAction> = (dispatch: (action: TAction) => void, getState: () => IApplicationState) => void;
