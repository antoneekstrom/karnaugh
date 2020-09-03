import React, { PropsWithChildren, useRef, useEffect, useState } from 'react';
import { IOverlayContext, useOverlayContext } from './Overlay';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';

export const OVERLAY_TYPE_MODAL = 'modal';

export default function Modal(props : PropsWithChildren<IOverlayContext>) {
  const [transition, setTransition] = useState(true);

  const {close, id, setOverlayItems, overlayItems} = useOverlayContext();
  const ref = useRef();

  useEffect(() => setOverlayItems(overlayItems.filter(item => item.data == OVERLAY_TYPE_MODAL || item.id == id)), []);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    if (e.target == ref.current) {
      setTransition(false);
    }
  }

  return (
    <CSSTransition appear in={transition} classNames="modal" timeout={300} onExited={() => close()} >
      <div className="modal" onClick={e => handleClick(e)} ref={ref}>
        {props.children}
      </div>
    </CSSTransition>
  )
}