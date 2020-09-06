import React from 'react';
import { ICoreClasses, coreProps } from './Common';
import './Toggle.css';

export default function Toggle(props: React.PropsWithChildren<ICoreClasses & {value: boolean, onChange: () => void}>) {
  return (
    <div {...coreProps(props, 'toggle')}>
      <input onChange={props.onChange} checked={props.value} type="checkbox"/>
      <h3>{props.children}</h3>
    </div>
  )
}