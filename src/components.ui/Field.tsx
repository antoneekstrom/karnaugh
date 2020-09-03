import React, { PropsWithChildren, useRef, useState } from 'react';
import { ICoreClasses, IBaseClasses, classNames, coreProps, baseClassNames } from './Common';
import '../resources/css/field.css';
import { MaterialIcon } from './Icon';
import Paper from './Paper';

export interface IFieldProps extends ICoreClasses, IBaseClasses {
  label ?: string;
  placeholder ?: string;
  name ?: string;
  type ?: 'text' | 'password' | 'email' | string;
  alwaysLabel ?: boolean;
  noLabel ?: boolean;
  value ?: string;
  dropdown ?: JSX.Element;
  onChange ?: (e : React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress ?: (e : React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur ?: (e : React.FocusEvent<HTMLInputElement>) => void;
}

export function useField(initialVal ?: string) : [string, {value : string, onChange : (e : React.ChangeEvent<any>) => void}, (value : string) => void] {
  const [val, setVal] = useState(initialVal);
  const props = { value: val, onChange: e => handleChange(e) }

  function handleChange(e : React.ChangeEvent<HTMLInputElement>) {
    setVal(e.currentTarget.value);
  }

  return [ val, props, setVal ];
}

export default function Field(props : IFieldProps) {
  const hasLabel = props.label !== undefined;
  const classes = classNames({
    'always-label': props.alwaysLabel,
    'label': hasLabel && !props.noLabel,
    'no-label': props.noLabel,
    ...baseClassNames(props)
    }, ['field']
  );

  function handleChange(e : React.ChangeEvent<HTMLInputElement>) {
    props.onChange?.(e);
  }

  function handleKeyPress(e : React.KeyboardEvent<HTMLInputElement>) {
    props.onKeyPress?.(e);
  }

  function handleBlur(e : React.FocusEvent<HTMLInputElement>) {
    props.onBlur?.(e);
  }

  return (
    <div {...coreProps(props, classes)}>
      <input
        type={props.type || "text"}
        name={props.name}
        placeholder={hasLabel ? " " : props.placeholder}
        value={props.value}
        onChange={e => handleChange(e)}
        onKeyPress={e => handleKeyPress(e)}
        onBlur={e => handleBlur(e)}
      />
      {!props.noLabel && <label htmlFor={props.name}>{props.label}</label>}
      {props.dropdown}
    </div>
  )
}

export function FieldDropdown(props : PropsWithChildren<any>) {
  return (
    <div className="field-dropdown">
      {props.children}
    </div>
  )
}

export function TextArea(props : {label ?: string, value ?: string, rows ?: number, onChange ?: (e : React.ChangeEvent<HTMLTextAreaElement>) => void}) {

  function handleChange(e : React.ChangeEvent<HTMLTextAreaElement>) {
    props.onChange?.(e);
  }

  return (
    <div className="textarea">
      {props.label && <label>{props.label}</label>}
      <Paper noPadding>
        <textarea className="scrollbar" rows={props.rows} value={props.value} onChange={e => handleChange(e)} />
      </Paper>
    </div>
  )
}