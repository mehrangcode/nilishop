
import { AuthReducer } from "../actions/Auth/reducer";
import { PanelReducer } from "../actions/Panel/reducer";
import { ProductReducer } from "../actions/Products/reducer";

export const reducers = {
    auth: AuthReducer,
    panel: PanelReducer,
    product: ProductReducer,
}