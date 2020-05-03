

import { IAuthState } from '../actions/Auth/model';
import { IPanelState } from '../actions/Panel/model';
import { IProductState } from '../actions/Products/model';
import { ICategoryState } from '../actions/Category/model';
export interface IApplicationState {
    auth: IAuthState,
    panel: IPanelState,
    product: IProductState,
    category: ICategoryState,
}

export type AppAction<TAction> = (dispatch: (action: TAction) => void, getState: () => IApplicationState) => void;
