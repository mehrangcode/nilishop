import { AppAction } from "../../store/state";
import { PanelActionTypes } from "./actionType";
import { ActionModel } from "./model";
import { PanelApi } from "./api";
import { EModal } from "../../Utils/Errors/Modal";

// export const PanelActions = {

    //Get Data
    export const getProducts= (): AppAction<ActionModel> => async (dispatch, getState) => {
        dispatch({type: PanelActionTypes.GetProductsList})
        try {
            const res = await PanelApi.getProducts()
            if(res.data){
                dispatch({type: PanelActionTypes.GetProductsListSuccess, data: res.data})
            }
        } catch (error) {
            //loagin perosses faild
            dispatch({type: PanelActionTypes.GetProductsListFail})
            EModal(error)
        }
        
    }

    export const deleteProducts= (productId: string): AppAction<ActionModel> => async (dispatch, getState) => {
        dispatch({type: PanelActionTypes.DeleteProduct})
        try {
            const res = await PanelApi.deleteProducts(productId)
            if(res.data){
                dispatch({type: PanelActionTypes.DeleteProductSuccess})
                getProducts()(dispatch, getState)
            }
        } catch (error) {
            //loagin perosses faild
            dispatch({type: PanelActionTypes.DeleteProductFail})
            EModal(error)
        }
        
    }
// };
