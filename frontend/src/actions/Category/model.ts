import { Action } from "redux";
import {CategoryActionTypes} from './actionType';

export interface ICategoryState {
    category: {
        loading: boolean;
        data: any[];
    }
    itemCRUD: {
        loading: string;
        data: any;
        open: string;
    }
}

interface IGetCategorysList extends Action<string> {
    type: CategoryActionTypes.GetCategorysList
}
interface IGetCategorysListSuccess extends Action<string> {
    type: CategoryActionTypes.GetCategorysListSuccess
    data: any
}
interface IGetCategorysListFail extends Action<string> {
    type: CategoryActionTypes.GetCategorysListFail
}

interface ICreateCategory extends Action<string> {
    type: CategoryActionTypes.CreateCategory
}
interface ICreateCategorySuccess extends Action<string> {
    type: CategoryActionTypes.CreateCategorySuccess
}
interface ICreateCategoryFail extends Action<string> {
    type: CategoryActionTypes.CreateCategoryFail
}

interface IGetCategoryData extends Action<string> {
    type: CategoryActionTypes.GetCategoryData
}
interface IGetCategoryDataSuccess extends Action<string> {
    type: CategoryActionTypes.GetCategoryDataSuccess;
    data: any;
}
interface IGetCategoryDataFail extends Action<string> {
    type: CategoryActionTypes.GetCategoryDataFail
}

interface IEditCategory extends Action<string> {
    type: CategoryActionTypes.EditCategory
}
interface IEditCategorySuccess extends Action<string> {
    type: CategoryActionTypes.EditCategorySuccess
}
interface IEditCategoryFail extends Action<string> {
    type: CategoryActionTypes.EditCategoryFail
}

interface IDeleteCategory extends Action<string> {
    type: CategoryActionTypes.DeleteCategory
}
interface IDeleteCategorySuccess extends Action<string> {
    type: CategoryActionTypes.DeleteCategorySuccess
}
interface IDeleteCategoryFail extends Action<string> {
    type: CategoryActionTypes.DeleteCategoryFail
}





export type ActionModel = IGetCategorysList
    | IGetCategorysListSuccess
    | IGetCategorysListFail
    | ICreateCategory
    | ICreateCategorySuccess
    | ICreateCategoryFail
    | IDeleteCategory
    | IDeleteCategorySuccess
    | IDeleteCategoryFail
    | IGetCategoryData
    | IGetCategoryDataSuccess
    | IGetCategoryDataFail
    | IEditCategory
    | IEditCategorySuccess
    | IEditCategoryFail