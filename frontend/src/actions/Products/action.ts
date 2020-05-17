import { AppAction } from "../../store/state";
import { ProductActionTypes } from "./actionType";
import { ActionModel } from "./model";
import { ProductApi } from "./api";
import { EModal } from "../../Utils/Errors/Modal";

// export const PanelActions = {

    //Get Data
    export const getProducts= (): AppAction<ActionModel> => async (dispatch, getState) => {
        dispatch({type: ProductActionTypes.GetProductsList})
        try {
            const res = await ProductApi.getProducts()
            if(res.data){
                dispatch({type: ProductActionTypes.GetProductsListSuccess, data: res.data})
            }
        } catch (error) {
            //loagin perosses faild
            dispatch({type: ProductActionTypes.GetProductsListFail})
            EModal(error)
        }
        
    }

    export const resetItem = (history: any = null): AppAction<ActionModel> => async (dispatch, getState) => {
        dispatch({type: ProductActionTypes.GetProductDataSuccess, data: null})
        if(history){
            history.push("/adminPanel/products")
        }
    }
    export const getProductForEdit= (productId: any, history: any): AppAction<ActionModel> => async (dispatch, getState) => {
        dispatch({type: ProductActionTypes.GetProductData})
        try {
            const res = await ProductApi.getOneProduct(productId)
            if(res.data){
                dispatch({type: ProductActionTypes.GetProductDataSuccess, data: res.data})
                history.push("/adminPanel/products/edit")
            }
        } catch (error) {
            //loagin perosses faild
            dispatch({type: ProductActionTypes.GetProductDataFail})
            EModal(error)
        }
    }
    export const createProduct= (data: any, history: any): AppAction<ActionModel> => async (dispatch, getState) => {
        dispatch({type: ProductActionTypes.DeleteProduct})
        try {
            const res = await ProductApi.createProduct(data)
            if(res.data){
                dispatch({type: ProductActionTypes.DeleteProductSuccess})
                history.push("/adminPanel/products")
            }
        } catch (error) {
            //loagin perosses faild
            dispatch({type: ProductActionTypes.DeleteProductFail})
            EModal(error)
        }
    }
    export const editProduct= (productId: string, data: any, history: any): AppAction<ActionModel> => async (dispatch, getState) => {
        dispatch({type: ProductActionTypes.DeleteProduct})
        try {
            const res = await ProductApi.editeProduct(productId, data)
            if(res.data){
                dispatch({type: ProductActionTypes.DeleteProductSuccess})
                history.push("/adminPanel/products")
            }
        } catch (error) {
            //loagin perosses faild
            dispatch({type: ProductActionTypes.DeleteProductFail})
            EModal(error)
        }
    }

    export const deleteProducts= (productId: string): AppAction<ActionModel> => async (dispatch, getState) => {
        dispatch({type: ProductActionTypes.DeleteProduct})
        try {
            const res = await ProductApi.deleteProducts(productId)
            if(res.data){
                dispatch({type: ProductActionTypes.DeleteProductSuccess})
                getProducts()(dispatch, getState)
            }
        } catch (error) {
            //loagin perosses faild
            dispatch({type: ProductActionTypes.DeleteProductFail})
            EModal(error)
        }
        
    }


    //####################################### Gallery Actions

    export const getGalleryDir= (path: string): AppAction<ActionModel> => async (dispatch, getState) => {
        dispatch({type: ProductActionTypes.GalleryFetch})
        try {
            const res = await ProductApi.getGalleryDir(path)
            if(res.data){
                dispatch({type: ProductActionTypes.GalleryFetchSuccess, data: res.data})
            }
        } catch (error) {
            //loagin perosses faild
            dispatch({type: ProductActionTypes.GalleryFetchFail})
            EModal(error)
        }
        
    }
// };
