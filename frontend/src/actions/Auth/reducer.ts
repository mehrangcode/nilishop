import { Reducer } from "redux";
import { AuthActionTypes } from "./actionType";
import { IAuthState, ActionModel } from "./model";

const unloadedState: IAuthState = {
    isAuth: false,
    login: {
        open: false,
        loading: false
    }
};

export const AuthReducer: Reducer<IAuthState> = (
    state: IAuthState = unloadedState,
    action: ActionModel,
) => {
    switch (action.type) {
        //#################### Login cases
        case AuthActionTypes.LoginModal: {
            return {
                ...state,
                login: {
                    ...state.login,
                    open: action.open
                },
            } as IAuthState;
        }
        case AuthActionTypes.Login: {
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: true,
                },
            } as IAuthState;
        }
        case AuthActionTypes.LoginSuccess: {
            return {
                ...state,
                isAuth: true,
                login: {
                    ...state.login,
                    loading: false,
                    open: false
                },
            } as IAuthState;
        }
        case AuthActionTypes.LoginFail: {
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                },
            } as IAuthState;
        }
        //#################### Logout cases
        case AuthActionTypes.LogOut: {
            return {
                ...state,
                isAuth: false,
            } as IAuthState;
        }
    }
    return state;
};
