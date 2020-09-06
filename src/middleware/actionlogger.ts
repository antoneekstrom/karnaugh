
import { Middleware, MiddlewareAPI } from "redux";

export function logWithStyle(message : string, css : {[property : string] : string}, ...args : any[]) {
    let cssText : string = "";
    for (const property in css) {
        if (css.hasOwnProperty(property)) {
            const value = css[property];
            cssText += `${property}: ${value};`;
        }
    }
    console.log(`%c${message}`, cssText, ...args);
}

/**
 * 
 * @param api 
 */
const actionLogger : Middleware = (api : MiddlewareAPI) => next => action => {

    const oldStateStyle = {
        "color": "#f7dc2a",
        "font-weight": "bold",
        "text-transform": "uppercase"
    }
    const dispatchStateStyle = {
        "color": "#0e85ed",
        "font-weight": "bold",
        "text-transform": "uppercase"
    }
    const newStateStyle = {
        "color": "#0eed0e",
        "font-weight": "bold",
        "text-transform": "uppercase"
    }

    logWithStyle("old state:", oldStateStyle, api.getState());
    logWithStyle("action:", dispatchStateStyle, action);
    const result = next(action);
    logWithStyle("new state:", newStateStyle, api.getState());
    return result;
}

export default actionLogger;