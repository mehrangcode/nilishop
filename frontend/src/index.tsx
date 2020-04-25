import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import axios from 'axios';
import configureStore from "./store/configStore";
import './styles/main.scss'
import App from './App';

const initialState = {}
const store = configureStore(initialState);
const isAuth = () => {
    const token = window.localStorage.getItem("Nili");
    if(token){
        store.getState().auth.isAuth = true
        axios.defaults.headers.common['Authorization'] = `${token}` 
    }
}

export const logOut = () => {
    window.localStorage.removeItem("Nili");
    store.getState().auth.isAuth = false;
    axios.defaults.headers.common['Authorization'] = `` 
}
isAuth();
ReactDOM.render(<Provider store={store}> <App />  </Provider>, document.getElementById('app-root'))