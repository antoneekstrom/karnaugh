import './List.css';
import { ICoreClasses, coreProps } from './Common';
import React from 'react';

export function ListItem(props: React.PropsWithChildren<ICoreClasses>) {
  return (
    <li {...coreProps(props, 'list-item')}>
      <p>
        {props.children}
      </p>
    </li>
  )
}