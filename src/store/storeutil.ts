
type PayloadCreator<A, P> = (args : A) => P;

/**
 * A payload creator which assigns the actioncreator arguments to a payload key on the action.
 * @param args The arguments.
 * @template A Actioncreator arguments.
 */
export function defaultPayloadCreator<A>(args : A) : {payload: A} {
    return {payload: args};
}

/**
 * Makes a simple actioncreator which adds the function arguments to the action.
 * @param type The action type.
 * @param argsType Optional arguments to infer type from.
 * @template P The payload type.
 * @template T The action type.
 */
export function makeDefaultActionCreator<P, T = string>(type : T, argsType ?: P) {
    return (args : P) => ({
        type,
        payload: args
    })
}

/**
 * Makes an actioncreator.
 * @param type The action type.
 * @param payloadCreator Transforms actioncreator arguments into payload.
 * @template T The action type.
 * @template A The actioncreator argument type.
 * @template P The payload type.
 */
export function makeActionCreator<T, A, P>(type : T, payloadCreator : PayloadCreator<A, P>) {
    return (args : A) => ({
        type,
        ...payloadCreator(args)
    })
}

/**
 * Update state (or any object) by making a copy and appending another object to it.
 * @param state The state.
 * @param data The data to apply.
 * @template S The state type.
 */
export function updateState<S>(state : S, data : any) : S {
    return Object.assign({}, state, data);
}
