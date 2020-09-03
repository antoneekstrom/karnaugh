import { updateState } from "./storeutil";

type View = typeof initialState;
type ActionTypes = any;

const initialState = {
}

function reducer(state : View = initialState, action : ActionTypes) : View {
    switch (action.type) {
        default:
            return updateState(state, {});
    }
}

export {
    reducer as viewReducer,
    initialState as viewInitialState,
    View,
}