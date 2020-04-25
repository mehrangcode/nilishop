
import { AuthReducer } from "../actions/Auth/reducer";
import { PanelReducer } from "../actions/Panel/reducer";

export const reducers = {
    auth: AuthReducer,
    panel: PanelReducer,
}