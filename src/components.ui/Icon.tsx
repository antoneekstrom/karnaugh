import React, { PropsWithChildren } from 'react';
import { ICoreClasses, coreProps, IBaseClasses } from './Common';
import '../resources/css/icon.css';

export interface IIconProps extends ICoreClasses, IBaseClasses {}

export interface ISvgIcon extends IIconProps {
  icon : SvgrComponent;
}

export function createIcon(id : string, type : 'material' | 'segoe' = 'material') {
  switch (type) {
    case 'material':
      return <MaterialIcon>{id}</MaterialIcon>;
    case 'segoe':
      return <SegoeIcon>{id}</SegoeIcon>;
  }
}

export function SvgIcon(props : PropsWithChildren<ISvgIcon>) {
  return (
    <div className="icon svg">
      <props.icon/>
    </div>
  )
}

export function MaterialIcon(props: PropsWithChildren<IIconProps>) {
  return (
    <i className="icon material-icons">{props.children}</i>
  )
}

export function SegoeIcon(props : PropsWithChildren<IIconProps>) {
  return (
    <i {...coreProps(props, 'icon segoe')}>{props.children}</i>
  )
}