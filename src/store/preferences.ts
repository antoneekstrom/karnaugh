import { updateState, makeDefaultActionCreator, makeActionCreator, defaultPayloadCreator } from "./storeutil";

type Theme = 'light' | 'dark';
type Preferences = typeof initialState;

const initialState = {
    theme: 'light' as Theme
}

function reducer(state : Preferences = initialState, action : ActionTypes) : Preferences {
    switch (action.type) {
        default:
            return updateState(state, {});
        case 'SET_THEME':
            return updateState(state, {name: action.payload});
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