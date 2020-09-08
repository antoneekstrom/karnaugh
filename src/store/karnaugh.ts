import { updateState, makeDefaultActionCreator } from "./storeutil";
import { Karnaugh, Rect, karnaugh, VAR_NAMES, ExpForm } from '../model/model';

type KarnaughState = typeof initialState;

const GRID_STORAGE_KEY = 'grid';
const FORM_STORAGE_KEY = 'form';

const initialState = {
    grid: getStoredGrid() as Karnaugh,
    rects: [] as Rect[],
    active: [] as number[],
    activeRect: undefined as Rect,
    settings: {
        form: (window.localStorage.getItem(FORM_STORAGE_KEY) || 'disjunctive') as ExpForm
    }
}

function reducer(state : KarnaughState = initialState, action : ActionTypes) : KarnaughState {
    switch (action.type) {
        default:
            return updateState(state, {});
        case 'SET_GRID':
            window.localStorage.setItem(GRID_STORAGE_KEY, JSON.stringify(action.payload));
            return updateState(state, {grid: action.payload});
        case 'SET_RECTS':
            return updateState(state, {rects: action.payload});
        case 'SET_ACTIVE':
            return updateState(state, {active: action.payload})
        case 'SET_ACTIVE_RECT':
            return updateState(state, {activeRect: action.payload, active: action.payload ? action.payload.indices : []})
        case 'SET_FORM':
            return updateState(state, {settings: {...state.settings, form: action.payload}})
    }
}

function getStoredGrid(): Karnaugh {
    if (new URL(window.location.href).searchParams.has('reset')) {
        return karnaugh(VAR_NAMES);
    }
    try {
        const k: Karnaugh = JSON.parse(window.localStorage.getItem(GRID_STORAGE_KEY));
        if (!k) {
            throw 'POO'
        }
        return k;
    }
    catch (err) {
        return karnaugh(VAR_NAMES);
    }
}

type ActionTypes = ReturnType<typeof setGrid> | ReturnType<typeof setRects> | ReturnType<typeof setActive> | ReturnType<typeof setActiveRect> | ReturnType<typeof setForm>

const SET_GRID = 'SET_GRID';
export const setGrid = makeDefaultActionCreator<Karnaugh, typeof SET_GRID>(SET_GRID, initialState.grid);

const SET_RECTS = 'SET_RECTS';
export const setRects = makeDefaultActionCreator<Rect[], typeof SET_RECTS>(SET_RECTS, initialState.rects);

const SET_ACTIVE = 'SET_ACTIVE';
export const setActive = makeDefaultActionCreator<number[], typeof SET_ACTIVE>(SET_ACTIVE, initialState.active);

const SET_ACTIVE_RECT = 'SET_ACTIVE_RECT';
export const setActiveRect = makeDefaultActionCreator<Rect, typeof SET_ACTIVE_RECT>(SET_ACTIVE_RECT, initialState.activeRect);

const SET_FORM = 'SET_FORM';
export const setForm = makeDefaultActionCreator<ExpForm, typeof SET_FORM>(SET_FORM, initialState.settings.form);

export {
    reducer as karnaughReducer,
    initialState as karnaughInitialState,
    ActionTypes as KarnaughActionTypes,
    KarnaughState
}