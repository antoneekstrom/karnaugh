import { updateState, makeDefaultActionCreator, makeActionCreator, defaultPayloadCreator } from "./storeutil";

type Theme = 'light' | 'dark';
type Preferences = typeof initialState;

const THEME_STORAGE_KEY = 'theme';

const initialState = {
    theme: (window.localStorage.getItem(THEME_STORAGE_KEY) || 'light') as Theme
}

function reducer(state : Preferences = initialState, action : ActionTypes) : Preferences {
    switch (action.type) {
        default:
            return updateState(state, {});
        case 'SET_THEME':
            window.localStorage.setItem(THEME_STORAGE_KEY, action.payload);
            return updateState(state, {theme: action.payload});
    }
}

type ActionTypes = ReturnType<typeof setTheme>;

const SET_THEME = 'SET_THEME';
export const setTheme = makeDefaultActionCreator<Theme, typeof SET_THEME>(SET_THEME, initialState.theme);

const TEST = 'TEST';
const test = makeActionCreator<typeof TEST, string, ReturnType<typeof defaultPayloadCreator>>(TEST, defaultPayloadCreator);

export {
    reducer as preferencesReducer,
    initialState as preferencesInitialState,
    ActionTypes as PreferencesActionTypes,
    Preferences,
    Theme
}