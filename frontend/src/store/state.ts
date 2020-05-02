

import { IAuthState } from '../actions/Auth/model';
import { IPanelState } from '../actions/Panel/model';
import { IProductState } from '../actions/Products/model';
export interface IApplicationState {
    auth: IAuthState,
    panel: IPanelState,
    product: IProductState,
}

export type AppAction<TAction> = (dispatch: (action: TAction) => void, getState: () => IApplicationState) => void;
