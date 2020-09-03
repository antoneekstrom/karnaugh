import React, { PropsWithChildren, useRef, useState, useEffect } from 'react';
import { Menu } from './Menu';
import './ContextMenu.css';
import {  IOverlayContext, useOverlayContext } from './Overlay';
import { useListener } from '../util';
import { CSSTransition } from 'react-transition-group';

export const OVERLAY_TYPE_CONTEXT_MENU = 'context_menu';

export default function ContextMenu(props : PropsWithChildren<IOverlayContext>) {

  const {pos} = props;
  const {close, overlayItems, setOverlayItems, id} = useOverlayContext();
  const [transition, setTransition] = useState(true);
  const [clickOutsideActive, setClickOutsideActive] = useState(false);
  const ref = useRef<any>();

  const style = {
    top: pos.y,
    left: pos.x
  }

  useEffect(() => {
    setOverlayItems(overlayItems.filter(item => item.data != OVERLAY_TYPE_CONTEXT_MENU || item.id == id));
    setClickOutsideActive(true);
  }, []);

  useListener(window.addEventListener, window.removeEventListener, "click", e => clickOutsideListener(e), [ref, clickOutsideActive]);

  function clickOutsideListener(e: Event) {
    if (clickOutsideActive && ref.current && !ref.current.contains(e.target)) {
      setTransition(false);
    }
  }

  return (
    <CSSTransition appear in={transition} classNames="roll" timeout={{appear: 500, exit: 200}} onExited={() => close()} >
      <div className="context-menu" style={style} ref={ref}>
        <Menu>
          {props.children}
        </Menu>
      </div>
    </CSSTransition>
  )
}