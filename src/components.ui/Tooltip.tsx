import React, { useState } from 'react';
import { CSSTransition } from "react-transition-group";
import './Tooltip.css';
import { StateToggle } from '../util';

export type TooltipProps = StateToggle;

export default function Tooltip(props: React.PropsWithChildren<TooltipProps>) {
  return (
    <CSSTransition
      classNames="tooltip"
      in={props.state}
      timeout={{enter: 1000}}
      onEntered={props.toggle}>
      <span className="tooltip">{props.children}</span>
    </CSSTransition>
  )
}