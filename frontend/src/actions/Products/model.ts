import { Action } from "redux";
import {PanelActionTypes} from './actionType';

export interface IProductState {
    products: {
        loading: boolean;
        data: any;
    }
    itemCRUD: {
        loading: string;
        open: string;
    }
}

interface IGetProductsList extends Action<string> {
    type: PanelActionTypes.GetProductsList
}
interface IGetProductsListSuccess extends Action<string> {
    type: PanelActionTypes.GetProductsListSuccess
    data: any
}
interface IGetProductsListFail extends Action<string> {
    type: PanelActionTypes.GetProductsListFail
}





export type ActionModel = IGetProductsList
    | IGetProductsListSuccess
    | IGetProductsListFail