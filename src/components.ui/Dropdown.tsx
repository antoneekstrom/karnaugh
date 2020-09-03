import React, { PropsWithChildren, useState, Fragment, Component, FunctionComponent } from 'react';
import '../resources/css/dropdown.css';
import Button, { IButtonProps } from './Button';
import { Menu } from './Menu';

export interface IDropdownProps {
  text : string;
  button ?: FunctionComponent<IButtonProps>;
}

export function Dropdown(props : PropsWithChildren<IDropdownProps>) {
  const [visible, setVisible] = useState(false);

  function handleClick(e) {
    setVisible(!visible);
  }

  const buttonProps = {
    active: visible,
    onClick: e => handleClick(e)
  }

  if (props.button == undefined)
    buttonProps['hover'] = true;

  const ButtonComponent = props.button || Button;
  
  return (
    <Fragment>
      <ButtonComponent {...buttonProps}>{props.text}</ButtonComponent>
      <Menu>
        {props.children}
      </Menu>
    </Fragment>
  )
}