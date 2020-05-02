import { Action } from "redux";
import {PanelActionTypes} from './actionType';

export interface IProductState {
    products: {
        loading: boolean;
        data: any[];
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

interface ICreateProduct extends Action<string> {
    type: PanelActionTypes.CreateProduct
}
interface ICreateProductSuccess extends Action<string> {
    type: PanelActionTypes.CreateProductSuccess
}
interface ICreateProductFail extends Action<string> {
    type: PanelActionTypes.CreateProductFail
}

interface IDeleteProduct extends Action<string> {
    type: PanelActionTypes.DeleteProduct
}
interface IDeleteProductSuccess extends Action<string> {
    type: PanelActionTypes.DeleteProductSuccess
}
interface IDeleteProductFail extends Action<string> {
    type: PanelActionTypes.DeleteProductFail
}





export type ActionModel = IGetProductsList
    | IGetProductsListSuccess
    | IGetProductsListFail
    | ICreateProduct
    | ICreateProductSuccess
    | ICreateProductFail
    | IDeleteProduct
    | IDeleteProductSuccess
    | IDeleteProductFail