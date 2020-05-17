import { Reducer } from "redux";
import { ProductActionTypes } from "./actionType";
import { IProductState, ActionModel } from "./model";

const unloadedState: IProductState = {
    products: {
        loading: false,
        data: []
    },
    itemCRUD: {
        loading: "",
        data: null,
        open: ""
    },
    gallery: {
        loading: false,
        data: []
    }
};


export const ProductReducer: Reducer<IProductState> = (
    state: IProductState = unloadedState,
    action: ActionModel,
) => {
    switch (action.type) {
        //#################### Login cases
        case ProductActionTypes.GetProductsList: {
            return {
                ...state,
                products: {
                    ...state.products,
                    loading: true
                },
            } as IProductState;
        }
        case ProductActionTypes.GetProductsListSuccess: {
            return {
                ...state,
                products: {
                    ...state.products,
                    loading: false,
                    data: action.data
                },
            } as IProductState;
        }
        case ProductActionTypes.GetProductsListFail: {
            return {
                ...state,
                products: {
                    ...state.products,
                    loading: false
                },
            } as IProductState;
        }
        case ProductActionTypes.CreateProduct: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "Create"
                },
            } as IProductState;
        }
        case ProductActionTypes.CreateProductSuccess: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: ""
                },
            } as IProductState;
        }
        case ProductActionTypes.CreateProductFail: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: ""
                },
            } as IProductState;
        }
        case ProductActionTypes.GetProductData: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "Get"
                },
            } as IProductState;
        }
        case ProductActionTypes.GetProductDataSuccess: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "",
                    data: action.data
                },
            } as IProductState;
        }
        case ProductActionTypes.GetProductDataFail: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "",
                },
            } as IProductState;
        }
        case ProductActionTypes.EditProduct: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "Edit",
                },
            } as IProductState;
        }
        case ProductActionTypes.EditProductSuccess: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "",
                    data: null
                },
            } as IProductState;
        }
        case ProductActionTypes.EditProductFail: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "",
                },
            } as IProductState;
        }
        case ProductActionTypes.DeleteProduct: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "Delete"
                },
            } as IProductState;
        }
        case ProductActionTypes.DeleteProductSuccess: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: ""
                },
            } as IProductState;
        }
        case ProductActionTypes.DeleteProductFail: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: ""
                },
            } as IProductState;
        }

        //Gallery
        case ProductActionTypes.GalleryFetch: {
            return {
                ...state,
                gallery: {
                    ...state.gallery,
                    loading: true
                },
            } as IProductState;
        }
        case ProductActionTypes.GalleryFetchSuccess: {
            return {
                ...state,
                gallery: {
                    ...state.gallery,
                    loading: false,
                    data: action.data
                },
            } as IProductState;
        }
        case ProductActionTypes.GalleryFetchFail: {
            return {
                ...state,
                gallery: {
                    ...state.gallery,
                    loading: false
                },
            } as IProductState;
        }

       

    }
    return state;
};
