import { Reducer } from "redux";
import { CategoryActionTypes } from "./actionType";
import { ICategoryState, ActionModel } from "./model";

const unloadedState: ICategoryState = {
    category: {
        loading: false,
        data: []
    },
    itemCRUD: {
        loading: "",
        data: null,
        open: ""
    }
};


export const CategoryReducer: Reducer<ICategoryState> = (
    state: ICategoryState = unloadedState,
    action: ActionModel,
) => {
    switch (action.type) {
        //#################### Login cases
        case CategoryActionTypes.GetCategorysList: {
            return {
                ...state,
                category: {
                    ...state.category,
                    loading: true
                },
            } as ICategoryState;
        }
        case CategoryActionTypes.GetCategorysListSuccess: {
            return {
                ...state,
                category: {
                    ...state.category,
                    loading: false,
                    data: action.data
                },
            } as ICategoryState;
        }
        case CategoryActionTypes.GetCategorysListFail: {
            return {
                ...state,
                category: {
                    ...state.category,
                    loading: false
                },
            } as ICategoryState;
        }
        case CategoryActionTypes.CreateCategory: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "Create"
                },
            } as ICategoryState;
        }
        case CategoryActionTypes.CreateCategorySuccess: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: ""
                },
            } as ICategoryState;
        }
        case CategoryActionTypes.CreateCategoryFail: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: ""
                },
            } as ICategoryState;
        }
        case CategoryActionTypes.GetCategoryData: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "Get"
                },
            } as ICategoryState;
        }
        case CategoryActionTypes.GetCategoryDataSuccess: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "",
                    data: action.data
                },
            } as ICategoryState;
        }
        case CategoryActionTypes.GetCategoryDataFail: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "",
                },
            } as ICategoryState;
        }
        case CategoryActionTypes.EditCategory: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "Edit",
                },
            } as ICategoryState;
        }
        case CategoryActionTypes.EditCategorySuccess: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "",
                    data: null
                },
            } as ICategoryState;
        }
        case CategoryActionTypes.EditCategoryFail: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "",
                },
            } as ICategoryState;
        }
        case CategoryActionTypes.DeleteCategory: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "Delete"
                },
            } as ICategoryState;
        }
        case CategoryActionTypes.DeleteCategorySuccess: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: ""
                },
            } as ICategoryState;
        }
        case CategoryActionTypes.DeleteCategoryFail: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: ""
                },
            } as ICategoryState;
        }

       

    }
    return state;
};
