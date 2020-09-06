import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from "redux";
import { RootState } from "../store";
import { serialize } from "../model/serialization";
import { LOCATION_CHANGE } from "connected-react-router";

export type SerializerMiddleware<S> = Middleware<{}, S, any>;

function serializer<S, T>(selector : (state : S) => T, compare : (prev : T, next : T) => boolean, file : string, api : MiddlewareAPI) {
    return next => (action : AnyAction) => {

        const prevState = selector(api.getState());
        const result : S = next(action);
        const nextState : T = selector(api.getState());

        if (action?.type != LOCATION_CHANGE) {
            if (compare(prevState, nextState)) {
                console.log(`Attempting to serialize state to ${file}`);
                serialize<T>(nextState, file).then(() => {
                    console.log(`serialized state to ${file}`, nextState);
                });
            }
        }
            
        return result;
    }
}

/**
 * Serialize store to file when changes are intercepted.
 * @param selector select which part to serialize
 * @param compare compare new and old state to apply/deny serialization
 * @param file the file to serialize to
 */
export default function createSeralizer<S, T>(selector : (state : S) => T, compare : (prev : T, next : T) => boolean, file : string) : SerializerMiddleware<S> {
    return (api : MiddlewareAPI) => serializer(selector, compare, file, api);
}