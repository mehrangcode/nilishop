import { Action } from "redux";
import {ProductActionTypes} from './actionType';

export interface IProductState {
    products: {
        loading: boolean;
        data: any[];
    }
    itemCRUD: {
        loading: string;
        data: any;
        open: string;
    }
    gallery: {
        loading: boolean;
        data: any[];
    }
}

interface IGetProductsList extends Action<string> {
    type: ProductActionTypes.GetProductsList
}
interface IGetProductsListSuccess extends Action<string> {
    type: ProductActionTypes.GetProductsListSuccess
    data: any
}
interface IGetProductsListFail extends Action<string> {
    type: ProductActionTypes.GetProductsListFail
}

interface ICreateProduct extends Action<string> {
    type: ProductActionTypes.CreateProduct
}
interface ICreateProductSuccess extends Action<string> {
    type: ProductActionTypes.CreateProductSuccess
}
interface ICreateProductFail extends Action<string> {
    type: ProductActionTypes.CreateProductFail
}

interface IGetProductData extends Action<string> {
    type: ProductActionTypes.GetProductData
}
interface IGetProductDataSuccess extends Action<string> {
    type: ProductActionTypes.GetProductDataSuccess;
    data: any;
}
interface IGetProductDataFail extends Action<string> {
    type: ProductActionTypes.GetProductDataFail
}

interface IEditProduct extends Action<string> {
    type: ProductActionTypes.EditProduct
}
interface IEditProductSuccess extends Action<string> {
    type: ProductActionTypes.EditProductSuccess
}
interface IEditProductFail extends Action<string> {
    type: ProductActionTypes.EditProductFail
}

interface IDeleteProduct extends Action<string> {
    type: ProductActionTypes.DeleteProduct
}
interface IDeleteProductSuccess extends Action<string> {
    type: ProductActionTypes.DeleteProductSuccess
}
interface IDeleteProductFail extends Action<string> {
    type: ProductActionTypes.DeleteProductFail
}


//################################# GALLERY
interface IGalleryFetch extends Action<string> {
    type: ProductActionTypes.GalleryFetch
}
interface IGalleryFetchSuccess extends Action<string> {
    type: ProductActionTypes.GalleryFetchSuccess
    data: any[]
}
interface IGalleryFetchFail extends Action<string> {
    type: ProductActionTypes.GalleryFetchFail
}


//################################# MakeNewFolder
interface IMakeNewFolder extends Action<string> {
    type: ProductActionTypes.MakeNewFolder
}
interface IMakeNewFolderSuccess extends Action<string> {
    type: ProductActionTypes.MakeNewFolderSuccess
}
interface IMakeNewFolderFail extends Action<string> {
    type: ProductActionTypes.MakeNewFolderFail
}

//################################# UploadFile
interface IUploadFile extends Action<string> {
    type: ProductActionTypes.UploadFile
}
interface IUploadFileSuccess extends Action<string> {
    type: ProductActionTypes.UploadFileSuccess
}
interface IUploadFileFail extends Action<string> {
    type: ProductActionTypes.UploadFileFail
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
    | IGetProductData
    | IGetProductDataSuccess
    | IGetProductDataFail
    | IEditProduct
    | IEditProductSuccess
    | IEditProductFail
    | IGalleryFetch
    | IGalleryFetchSuccess
    | IGalleryFetchFail
    | IMakeNewFolder
    | IMakeNewFolderSuccess
    | IMakeNewFolderFail
    | IUploadFile
    | IUploadFileSuccess
    | IUploadFileFail