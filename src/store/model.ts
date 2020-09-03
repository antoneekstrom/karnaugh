import { updateState, makeDefaultActionCreator } from "./storeutil";
import { Karnaugh, karnaugh } from "../model";

type Model = typeof initialState;

const initialState = {
    grid: karnaugh(4) as Karnaugh
}

function reducer(state : Model = initialState, action : ActionTypes) : Model {
    switch (action.type) {
        default:
        case "SET_GRID":
            return updateState(state, {grid: action.payload});
    }
}

type ActionTypes = ReturnType<typeof setGrid>;

const SET_GRID = 'SET_GRID';
export const setGrid = makeDefaultActionCreator<Karnaugh, typeof SET_GRID>(SET_GRID, initialState.grid);

export {
    reducer as modelReducer,
    initialState as modelInitialState,
    Model,
}