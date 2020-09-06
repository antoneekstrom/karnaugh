import React from 'react';
import { coreProps, ICoreClasses } from './Common';

export default function Page(props: React.PropsWithChildren<ICoreClasses>) {
  return (
    <div {...coreProps(props, 'page')}>
      {props.children}
    </div>
  )
}