import { createStore, combineReducers, Store, Reducer as ReduxReducer } from 'redux';
import { Preferences, preferencesReducer } from "./preferences";
import { View, viewReducer } from './view';

import { connectRouter, RouterState, LocationChangeAction } from "connected-react-router";
import { createHashHistory } from "history";

type State = {preferences: Preferences, view: View, router: RouterReducer};
type Reducer = typeof reducer;
type RouterReducer = ReduxReducer<RouterState<{}>, LocationChangeAction<{}>>;

const history = createHashHistory();
const routerReducer : RouterReducer = connectRouter(history);

const reducer = combineReducers({preferences: preferencesReducer, view: viewReducer, router: routerReducer});

function configureStore() {
    const store : Store<State> = createStore(reducer);
    return {store, history}
}

export default configureStore;
export {
    State as StoreState,
    Reducer as StoreReducer
}