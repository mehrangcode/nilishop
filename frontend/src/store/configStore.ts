import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducer";

export default function configureStore(initialState: any) {
    const middleware = [thunk];

    const enhancers: any[] = [];
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment && typeof window !== "undefined" && (window as any).devToolsExtension) {
        enhancers.push((window as any).devToolsExtension());
    }

    const rootReducer = combineReducers({ ...reducers });

    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers,
        ),
    );
}