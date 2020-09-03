import React, { PropsWithChildren } from 'react';
import { ICoreClasses, coreProps } from './Common';
import '../resources/css/typography.css';

/**
 * Load typography stylesheet dynamically.
 */
export function loadStyle() {
  import('../resources/css/typography.css');
}

export function Paragraph(props : PropsWithChildren<ICoreClasses>) {
  return (
    <p {...coreProps(props, 'paragraph')}>{props.children}</p>
  )
}

export function Description(props) {
  return (
      <p className="description">{props.children}</p>
  )
}

export function Emphasis(props) {
  return (
      <span className="emphasis">{props.children}</span>
  )
}