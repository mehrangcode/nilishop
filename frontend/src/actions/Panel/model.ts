import { Action } from "redux";
import {PanelActionTypes} from './actionType';

export interface IPanelState {
    panelData: {
        loading: boolean;
        data: any;
    }
    itemCRUD: {
        loading: string;
        open: string;
    }
}

interface IGetPanelData extends Action<string> {
    type: PanelActionTypes.GetPanelData
}
interface IGetPanelDataSuccess extends Action<string> {
    type: PanelActionTypes.GetPanelDataSuccess
    data: any
}
interface IGetPanelDataFail extends Action<string> {
    type: PanelActionTypes.GetPanelDataFail
}





export type ActionModel = IGetPanelData
    | IGetPanelDataSuccess
    | IGetPanelDataFail