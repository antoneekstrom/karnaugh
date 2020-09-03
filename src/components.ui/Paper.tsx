import React, { PropsWithChildren, BlockquoteHTMLAttributes } from 'react';
import { classNames, ICoreClasses, coreProps, baseClassNames, IIntentClasses, intentClassNames } from './Common';
import '../resources/css/paper.css';
import { IBaseClasses } from '../style/classnames';

export interface IPaperProps extends ICoreClasses, IBaseClasses, IIntentClasses {
  minWidth ?: string;
  maxWidth ?: string;
  noPadding ?: boolean;
  expand ?: boolean;
  hover ?: boolean;
}

export default function Paper(props : PropsWithChildren<IPaperProps>) {
    const classes = classNames({
        'no-padding': props.noPadding,
        ...baseClassNames(props),
        ...intentClassNames(props)
    }, ['paper']);


    const styles = {'minWidth': props.minWidth, 'maxWidth': props.maxWidth};
    return (
        <div {...coreProps(props, classes, styles)}>
            {props.children}
        </div>
    )
}