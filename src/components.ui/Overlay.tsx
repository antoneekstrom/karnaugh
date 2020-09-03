import React, { PropsWithChildren, FunctionComponent, useContext } from 'react';
import { position, Position } from '../util';

export interface IOverlayContext {
  close: () => void;
  id: string;
  pos : Position;
}

export interface OverlayContextHandle extends IOverlayContext {
  show: (e : React.MouseEvent, show ?: boolean) => string;
}

export interface IOverlayItem {
  id : string;
  item : JSX.Element;
  data ?: any;
}

export interface IOverlayContainerContext {
  addOverlayItem: (item : JSX.Element, data ?: any) => string;
  removeOverlayItem: (context : IOverlayContainerContext, itemId : string) => void;
  setOverlayItems: (items : IOverlayItem[]) => void;
  overlayItems: IOverlayItem[];
}

/**
 * 
 */
export const overlayContext = React.createContext<IOverlayContext>(undefined);

/**
 * 
 * @param Compo 
 * @param content 
 * @param data 
 */
export function useOverlay(Compo : FunctionComponent<IOverlayContext>, content ?: JSX.Element, data ?: any) : OverlayContextHandle {
  const context = useContext(overlayContainerContext);
  let props : IOverlayContext | any = {};

  function show(e : React.MouseEvent | Position) : string {

    props.pos = ((e as React.MouseEvent).target) ? position(e as React.MouseEvent) : e;
    props.close = close;

    const el = (
      <overlayContext.Provider value={props} key={Math.random() * 100}>
        <Compo {...props}>
          {content}
        </Compo>
      </overlayContext.Provider>
    )

    props.id = context.addOverlayItem(el, data);

    return props.id;
  }

  function close() {
    context.removeOverlayItem(context, props.id);
  }

  return {...props, show};
}

/**
 * 
 */
export function useOverlayContext() {
  const {id} = useContext(overlayContext);
  const c = useContext(overlayContainerContext);

  return {
    close: () => c.removeOverlayItem(c, id),
    ...c,
    id
  }
}

/**
* Context for sharing a container of overlay-type elements across the application.
*/
export const overlayContainerContext = React.createContext<IOverlayContainerContext>(undefined);

/**
 * Can store temporary overlayed elements such as modals and prompt-like containers.
 */

export function OverlayContainer(props : PropsWithChildren<any>) {
  return (
      <div className="overlay-container">
          {props.children}
      </div>
  )
}