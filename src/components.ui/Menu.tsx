import React, { PropsWithChildren } from 'react';
import { ICoreClasses, coreProps, classNames } from './Common';
import Button, { IButtonClasses, buttonClassNames, buttonProps } from './Button';
import Paper from './Paper';
import '../resources/css/menu.css';
import '../resources/css/list.css';

export interface IMenuProps extends ICoreClasses {}

export interface IMenuItemProps extends ICoreClasses, IButtonClasses {
  content ?: any;
}

export function MenuItem(props : PropsWithChildren<IMenuItemProps>) {
  return (
    <li {...coreProps(props, 'menu-item')}>
      <Button flat hover {...buttonProps(props)}>{props.children}</Button>
      {props.content}
    </li>
  )
}

export function SubMenu(props : PropsWithChildren<IMenuItemProps & {label ?: string}>) {

  const subMenu = (
    <div className="sub-menu">
      <Menu>
        {props.children}
      </Menu>
    </div>
  )

  return (
    <MenuItem icon={props.icon} content={subMenu} {...buttonProps(props)}>
      {props.label}
    </MenuItem>
  )
}

export function Menu(props : PropsWithChildren<IMenuProps>) {  
  return (
    <div className="menu-container">
      <Paper noPadding {...coreProps(props, 'menu')}>
        <List>
          {props.children}
        </List>
      </Paper>
    </div>
  )
}

export function ListEntry(props) {
  return (
    <li className="menu-item list-entry">
      <p><span className="bold">{props.label}</span></p>
      <p>{props.children}</p>
    </li>
  )
}

export function List(props : PropsWithChildren<ICoreClasses>) {
  return (
    <ul {...coreProps(props, 'menu-list')}>
      {props.children}
    </ul>
  )
}