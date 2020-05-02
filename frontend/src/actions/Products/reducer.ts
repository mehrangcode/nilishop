import { Reducer } from "redux";
import { PanelActionTypes } from "./actionType";
import { IProductState, ActionModel } from "./model";

const unloadedState: IProductState = {
    products: {
        loading: false,
        data: null
    },
    itemCRUD: {
        loading: "",
        open: ""
    }
};


export const ProductReducer: Reducer<IProductState> = (
    state: IProductState = unloadedState,
    action: ActionModel,
) => {
    switch (action.type) {
        //#################### Login cases
        case PanelActionTypes.GetProductsList: {
            return {
                ...state,
                products: {
                    ...state.products,
                    loading: true
                },
            } as IProductState;
        }
        case PanelActionTypes.GetProductsListSuccess: {
            return {
                ...state,
                products: {
                    ...state.products,
                    loading: false,
                    data: action.data
                },
            } as IProductState;
        }
        case PanelActionTypes.GetProductsListFail: {
            return {
                ...state,
                products: {
                    ...state.products,
                    loading: false
                },
            } as IProductState;
        }

       

    }
    return state;
};
