import { Action } from "redux";
import {AuthActionTypes} from './actionType'


export type RegisterType = {
    fullName: string;
    email: string;
    password: string;
}
export type LoginType = {
    email: string;
    password: string;
}

export interface IAuthState {
    isAuth: boolean;
    login: {
        loading: boolean;
        open: boolean;
    }
}

//login actionType
interface ILoginModal extends Action<string> {
    type: AuthActionTypes.LoginModal;
    open: boolean;
}

//Register
interface IRegister extends Action<string> {
    type: AuthActionTypes.Register;
}
interface IRegisterSuccess extends Action<string> {
    type: AuthActionTypes.RegisterSuccess;
}
interface IRegisterFail extends Action<string> {
    type: AuthActionTypes.RegisterFail;
}



interface ILogin extends Action<string> {
    type: AuthActionTypes.Login;
}
interface ILoginSuccess extends Action<string> {
    type: AuthActionTypes.LoginSuccess;
}
interface ILoginFail extends Action<string> {
    type: AuthActionTypes.LoginFail;
}

//logout actionType
interface ILogOut extends Action<string> {
    type: AuthActionTypes.LogOut;
}

export type ActionModel = ILoginModal
    | IRegister
    | IRegisterSuccess
    | IRegisterFail
    | ILogin
    | ILoginSuccess
    | ILoginFail
    | ILogOut