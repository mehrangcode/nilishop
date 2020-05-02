import { Reducer } from "redux";
import { PanelActionTypes } from "./actionType";
import { IProductState, ActionModel } from "./model";

const unloadedState: IProductState = {
    products: {
        loading: false,
        data: []
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
        case PanelActionTypes.CreateProduct: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "Create"
                },
            } as IProductState;
        }
        case PanelActionTypes.CreateProductSuccess: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: ""
                },
            } as IProductState;
        }
        case PanelActionTypes.CreateProductFail: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: ""
                },
            } as IProductState;
        }
        case PanelActionTypes.DeleteProduct: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "Delete"
                },
            } as IProductState;
        }
        case PanelActionTypes.DeleteProductSuccess: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: ""
                },
            } as IProductState;
        }
        case PanelActionTypes.DeleteProductFail: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: ""
                },
            } as IProductState;
        }

       

    }
    return state;
};
