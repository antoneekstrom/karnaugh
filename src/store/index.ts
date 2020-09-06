import { createStore, combineReducers,  Reducer as ReduxReducer, applyMiddleware, Middleware, StoreEnhancer } from 'redux';
import { connectRouter, RouterState, LocationChangeAction } from "connected-react-router";
import { createHashHistory } from "history";
import { useSelector } from 'react-redux';

import { Preferences, preferencesReducer } from "./preferences";
import { View, viewReducer } from './view';
import { KarnaughState, karnaughReducer } from './karnaugh';


type State = {preferences: Preferences, view: View, router: RouterReducer, karnaugh: KarnaughState};
type Reducer = typeof reducer;
type RouterReducer = ReduxReducer<RouterState<{}>, LocationChangeAction<{}>>;

const history = createHashHistory();
const routerReducer : RouterReducer = connectRouter(history);

const reducer = combineReducers({preferences: preferencesReducer, view: viewReducer, router: routerReducer, karnaugh: karnaughReducer});

export function createStoreEnhancer(...middleware : Middleware[]) {
    return applyMiddleware(...middleware);
}

export default function configureStore(enhancer ?: StoreEnhancer) {
    const store = createStore(reducer, enhancer);
    return {store, history}
}

export function useStoreSelector<T>(selector: (state: State) => T): T {
    return useSelector(selector);
}

export {
    State as StoreState,
    Reducer as StoreReducer
}