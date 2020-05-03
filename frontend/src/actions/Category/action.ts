import { AppAction } from "../../store/state";
import { CategoryActionTypes } from "./actionType";
import { ActionModel } from "./model";
import { CategoryApi } from "./api";
import { EModal } from "../../Utils/Errors/Modal";

// export const PanelActions = {

    //Get Data
    export const getCategoryList= (): AppAction<ActionModel> => async (dispatch, getState) => {
        dispatch({type: CategoryActionTypes.GetCategorysList})
        try {
            const res = await CategoryApi.getCategoryList()
            if(res.data){
                dispatch({type: CategoryActionTypes.GetCategorysListSuccess, data: res.data})
            }
        } catch (error) {
            //loagin perosses faild
            dispatch({type: CategoryActionTypes.GetCategorysListFail})
            EModal(error)
        }
        
    }

    export const resetItem = (history: any = null): AppAction<ActionModel> => async (dispatch, getState) => {
        dispatch({type: CategoryActionTypes.GetCategoryDataSuccess, data: null})
        if(history){
            history.push("/adminPanel/Category")
        }
    }
    export const getCategoryForEdit= (CategoryId: any, history: any): AppAction<ActionModel> => async (dispatch, getState) => {
        dispatch({type: CategoryActionTypes.GetCategoryData})
        try {
            const res = await CategoryApi.getOneCategory(CategoryId)
            if(res.data){
                dispatch({type: CategoryActionTypes.GetCategoryDataSuccess, data: res.data})
                history.push("/adminPanel/Category/edit")
            }
        } catch (error) {
            //loagin perosses faild
            dispatch({type: CategoryActionTypes.GetCategoryDataFail})
            EModal(error)
        }
    }
    export const createCategory= (data: any, history: any): AppAction<ActionModel> => async (dispatch, getState) => {
        dispatch({type: CategoryActionTypes.DeleteCategory})
        try {
            const res = await CategoryApi.createCategory(data)
            if(res.data){
                dispatch({type: CategoryActionTypes.DeleteCategorySuccess})
                history.push("/adminPanel/Category")
            }
        } catch (error) {
            //loagin perosses faild
            dispatch({type: CategoryActionTypes.DeleteCategoryFail})
            EModal(error)
        }
    }
    export const editCategory= (CategoryId: string, data: any, history: any): AppAction<ActionModel> => async (dispatch, getState) => {
        dispatch({type: CategoryActionTypes.DeleteCategory})
        try {
            const res = await CategoryApi.editeCategory(CategoryId, data)
            if(res.data){
                dispatch({type: CategoryActionTypes.DeleteCategorySuccess})
                history.push("/adminPanel/Category")
            }
        } catch (error) {
            //loagin perosses faild
            dispatch({type: CategoryActionTypes.DeleteCategoryFail})
            EModal(error)
        }
    }

    export const deleteCategory= (CategoryId: string): AppAction<ActionModel> => async (dispatch, getState) => {
        dispatch({type: CategoryActionTypes.DeleteCategory})
        try {
            const res = await CategoryApi.deleteCategory(CategoryId)
            if(res.data){
                dispatch({type: CategoryActionTypes.DeleteCategorySuccess})
                getCategoryList()(dispatch, getState)
            }
        } catch (error) {
            //loagin perosses faild
            dispatch({type: CategoryActionTypes.DeleteCategoryFail})
            EModal(error)
        }
        
    }
// };
