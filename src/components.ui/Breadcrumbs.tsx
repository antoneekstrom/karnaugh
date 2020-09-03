import React, { PropsWithChildren } from 'react'
import Button from './Button';
import { ICoreClasses, joinClassNames } from './Common';
import { MaterialIcon } from './Icon';
import '../resources/css/crumbs.css';
import '../resources/css/list.css';

export interface ICrumbProps extends ICoreClasses {
  name : string;
  dropdownIcon ?: boolean;
}

export function Crumb(props : PropsWithChildren<ICrumbProps>) {
  const icon = <MaterialIcon>expand_more</MaterialIcon>;
  return (
    <li className={joinClassNames('crumb', props.className)}>
      <Button iconSide="right" flat small hover onAuxClick={e => props.onAuxClick?.(e)} onClick={e => props.onClick?.(e)} icon={props.dropdownIcon && icon}>
        {props.name}
      </Button>
      {props.children}
    </li>
  )
}

export function Breadcrumbs(props : PropsWithChildren<any>) {
  return (
    <ol className="breadcrumbs">
      {props.children}
    </ol>
  )
}