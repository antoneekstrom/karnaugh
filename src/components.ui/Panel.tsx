import React, { PropsWithChildren } from 'react';
import { ICoreClasses, coreProps } from './Common';
import '../resources/css/panel.css';

export interface IPanelProps extends ICoreClasses {}

export default function Panel(props : PropsWithChildren<IPanelProps>) {
  return (
    <div {...coreProps(props, 'panel')}>
      {props.children}
    </div>
  )
}