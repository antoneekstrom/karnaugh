import '../resources/css/base.css';
import { CSSProperties } from 'react';


/* Types */

export type IClassNames = {
  [className : string] : boolean;
}

export type IClassParameter = boolean;



/* Utility Functions */

/**
 * Join two classnames which may be undefined.
 * @param a classname a
 * @param b classname b
 */
export function joinClassNames(...classNames : string[]) : string {
  const name = classNames.reduce((r, cname, i) => {
    if (i == 0 && cname != undefined) return cname;
    if (r == '') return cname != undefined ? cname : '';
    return cname != undefined ? `${r} ${cname}` : r;
  }, '');
  return name.length > 0 ? name : undefined;
}

/**
 * Combines a set of variable classnames.
 * @param classes the classes
 * @param always additional unconditional classes
 */
export function classNames(classes : IClassNames, always ?: string[] | string) : string {
  let pre : string;

  let conditional = Object.keys(classes).reduce((acc, key) => (classes[key] === true) ? `${acc}${acc !== '' ? ' ' : ''}${key}` : acc, '');

  if (typeof always === "string") {
      pre = always;
  }
  else if (Array.isArray(always)) {
      pre = (always ? (always.join(" ")) : '');
  }
  else {
      pre = "";
  }

  return `${pre}${(conditional.length > 0) ? (pre.length > 0 ? ' ' : '') + conditional : ''}`;
}



/* Core Classes */

export type ICoreClasses<T = HTMLElement> = {
  className ?: string;
  style ?: React.CSSProperties;
  onClick ?: (e : React.MouseEvent<T, MouseEvent>) => void;
  onAuxClick ?: (e : React.MouseEvent<T, MouseEvent>) => void;
}

export function coreProps(props : ICoreClasses, className ?: string, style ?: CSSProperties) : ICoreClasses {
  return {
    'style': Object.assign({}, props.style, style),
    'className': joinClassNames(className, props.className),
    'onClick': props.onClick,
    'onAuxClick': props.onAuxClick
  }
}



/*
Function suffixed with 'ClassNames' converts an object that contains class attributes (mainly props)
into an IClassNames object that can then be used by classNames() to create a string containing those classes correctly formatted.
*/


/* Base Classes */

export type IBaseClasses = {
  flat?: IClassParameter,
  fill?: IClassParameter,
  expand?: IClassParameter,
  hover?: IClassParameter,
  small?: IClassParameter
}

export function baseClassNames(classes : IBaseClasses) : IClassNames {
  return {
      'flat': classes.flat,
      'fill': classes.fill,
      'expand': classes.expand,
      'hover': classes.hover,
      'small': classes.small
  }
}



/* Intent Classes */

export type IIntentClasses = {
  primary?: IClassParameter
  active?: IClassParameter
  selected?: IClassParameter
  inactive?: IClassParameter
  error?: IClassParameter
}

export function intentClassNames(classes : IIntentClasses) : IClassNames {
  return {
      'primary': classes.primary,
      'active': classes.active,
      'selected': classes.selected,
      'inactive': classes.inactive,
      'error': classes.error
  }
}