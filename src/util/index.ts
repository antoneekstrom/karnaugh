import { List } from 'immutable';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export function limitSize<T>(list : List<T>, max : number) : List<T> {
    const s = list.size - max;
    return list.slice(s < 0 ? 0 : s);
}

export function useAsync<T>(asyncFunc: () => Promise<T>, cleanup?: () => any) {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<T>(undefined);

    function effect() {

        async function load() {
            const result = await asyncFunc();
            setData(result);
            setIsLoading(false);
        }

        setIsLoading(true);
        load();
        return cleanup;
    };

    return { data, isLoading, effect };
}

export function later(delay : number) : Promise<void> {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}

export function useInterval(callback : () => boolean, interval : number, initialState ?: any) {

    let state, setState;

    if (initialState != undefined) {
        [state, setState] = useState(initialState);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            if (!callback()) {
                clearInterval(timer);
            }
        }, interval);
        return () => {
            clearInterval(timer);
        }
    }, []);

    return [state, setState];
}

export type ListenerConsumer<E, T> = (event : T, listener : (e : E) => void) => any; 
export type Listener<E> = (e : E) => void;

export function useListener<E, T>(emitter : ListenerConsumer<E, T>, remover : ListenerConsumer<E, T>, event : T, listener : Listener<E>, deps ?: React.DependencyList) {
    function effect() {
        emitter(event, listener);
        return () => remover(event, listener);
    }
    useEffect(effect, deps);
}

export type Position = { x: number; y: number; }

export function position(e : React.MouseEvent) : Position {
  return {
    x: e.clientX,
    y: e.clientY
  }
}

export type StateToggle = {
    state: boolean
    toggle: () => void
}

export function useToggle(initial: boolean): StateToggle {
    const [state, setState] = useState(initial);
    return {
        toggle: () => setState(!state),
        state
    }
}

export function range(len: number) {
    return [...Array.from(Array(len).keys())];
}