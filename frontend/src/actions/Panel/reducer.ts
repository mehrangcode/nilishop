import { Reducer } from "redux";
import { PanelActionTypes } from "./actionType";
import { IPanelState, ActionModel } from "./model";

const unloadedState: IPanelState = {
    panelData: {
        loading: false,
        data: null
    },
    itemCRUD: {
        loading: "",
        open: ""
    }
};


export const PanelReducer: Reducer<IPanelState> = (
    state: IPanelState = unloadedState,
    action: ActionModel,
) => {
    switch (action.type) {
        //#################### Login cases
        case PanelActionTypes.GetPanelData: {
            return {
                ...state,
                panelData: {
                    ...state.panelData,
                    loading: true
                },
            } as IPanelState;
        }
        case PanelActionTypes.GetPanelDataSuccess: {
            return {
                ...state,
                panelData: {
                    ...state.panelData,
                    loading: false,
                    data: action.data
                },
            } as IPanelState;
        }
        case PanelActionTypes.GetPanelDataFail: {
            return {
                ...state,
                panelData: {
                    ...state.panelData,
                    loading: false
                },
            } as IPanelState;
        }

       

    }
    return state;
};
