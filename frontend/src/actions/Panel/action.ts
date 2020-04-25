import { AppAction } from "../../store/state";
import { PanelActionTypes } from "./actionType";
import { ActionModel } from "./model";
import { PanelApi } from "./api";

// export const PanelActions = {

    //Get Data
    export const getPanelData= (): AppAction<ActionModel> => async (dispatch, getState) => {
        dispatch({type: PanelActionTypes.GetPanelData})
        try {
            const res = await PanelApi.getPanelData()
            if(res.data){
                dispatch({type: PanelActionTypes.GetPanelDataSuccess, data: res.data})
            }
        } catch (error) {
            //loagin perosses faild
            dispatch({type: PanelActionTypes.GetPanelDataFail})
            alert(error.response.data.message)
        }
        
    }
// };
