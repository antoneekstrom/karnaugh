import React, { PropsWithChildren } from 'react';
import { IBaseClasses, IIntentClasses, classNames, baseClassNames, intentClassNames, ICoreClasses, coreProps, joinClassNames } from './Common';
import '../resources/css/button.css';
import { useHistory } from 'react-router';

export interface IButtonProps extends ICoreClasses, IBaseClasses, IIntentClasses, IButtonClasses {
  text ?: string;
}

export interface IButtonClasses {
  slim ?: boolean;
  icon ?: any;
  iconSide ?: 'left' | 'right'
}

export interface IIconButtonProps extends IButtonProps {
  icon : JSX.Element;
}

export interface ILinkProps extends IButtonProps {
  to : string;
}

export function buttonClassNames(classes : IButtonClasses) {
  return {
    'slim': classes.slim,
    [`icon-${classes.iconSide || 'left'}`]: true
  }
}

export function buttonProps(props : IButtonProps) : IButtonProps {
  return {
    icon: props.icon,
    iconSide: props.iconSide
  }
}

export function Link(props : PropsWithChildren<ILinkProps>) {
  const history = useHistory();
  function handleClick() {
    history.push(props.to);
  }

  let buttonProps = Object.assign({}, props);
  buttonProps['onClick'] = e => {
    props.onClick?.(e);
    handleClick();
  };

  return (
    <Button {...buttonProps}></Button>
  )
}

export default function Button(props : PropsWithChildren<IButtonProps>) {

  const classes = classNames({
    ...baseClassNames(props),
    ...intentClassNames(props),
    ...buttonClassNames(props)
  }, 'button')

  return (
    <button {...coreProps(props, classes)}>
      {props.icon && props.icon}
      {props.children}
    </button>
  )
}

export function IconButton(props : PropsWithChildren<IIconButtonProps>) {

  const classes = classNames({
    ...baseClassNames(props),
    ...intentClassNames(props),
    ...{'slim': props.slim}
  }, 'button')

  return (
    <button {...coreProps(props, joinClassNames(classes, 'icon-button'))}>
      {props.icon}
    </button>
  )
}