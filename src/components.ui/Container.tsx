import React, { PropsWithChildren } from 'react';
import { classNames, ICoreClasses, coreProps } from './Common';
import '../resources/css/container.css';

export interface IContainerProps extends ICoreClasses {
  v ?: boolean;
  h ?: boolean;
  small ?: boolean;
  medium ?: boolean;
  large ?: boolean;
  child ?: JSX.Element;
}

export default function Container(props : PropsWithChildren<IContainerProps>) {
  const classes = {
    v: props.v,
    h: props.h,
    small: props.small,
    medium: props.medium,
    large: props.large
  }
  return (
    <div {...coreProps(props, classNames(classes, 'container'))}>
      {props.child || props.children}
    </div>
  )
}

export interface IRowProps extends ICoreClasses {
  align ?: 'left' | 'right' | 'center'
}

export function Row(props : PropsWithChildren<IRowProps>) {
  let justify : string;
  switch (props.align) {
    case 'left': justify = 'start'; break;
    case 'right': justify = 'end'; break;
    case 'center': justify = 'center'; break;
  }
  let attributes : any = coreProps(props, 'row');
  attributes = Object.assign({}, attributes, {style: {justifyContent: justify}});
  return (
    <div {...attributes}>{props.children}</div>
  )
}