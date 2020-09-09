import React, { Fragment } from 'react';
import { Expression, Rect, expJoinCharacter, expToString } from "../model/model";
import { useToggle } from "../util";
import { MaterialIcon } from '../components.ui/Icon';
import Tooltip from '../components.ui/Tooltip';
import { setActiveRect } from '../store/karnaugh';
import { useDispatch } from 'react-redux';
import { classNames } from '../components.ui/Common';
import { useStoreSelector } from '../store';
import './Expression.css';

export default function Expression(props: {exp: Expression}) {
  const {activeRect, settings} = useStoreSelector(state => ({...state.karnaugh, ...state.preferences}));
  const tooltip = useToggle(false);
  const dispatch = useDispatch();

  return (
    <div className="expression">
      <h2>
        {
          props.exp.length > 0 ? props.exp.map((v, i) => <Fragment key={i}>{i != 0 ? <span>{expJoinCharacter(settings.form)}</span> : <span>f=</span>}<Part v={v}/></Fragment>) : 'f=0'
        }
      </h2>
      <button onClick={saveToClipboard}>
        <MaterialIcon>content_paste</MaterialIcon>
        <Tooltip {...tooltip}>Copied to clipboard!</Tooltip>
      </button>
    </div>
  )

  function saveToClipboard() {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(expToString(props.exp, settings.form));
    }
    tooltip.toggle();
  }

  function Part(props: {v: {r: Rect, var: string}}) {
    const isActive = props.v.r == activeRect;
    return (
      <span
        onMouseLeave={() => dispatch(setActiveRect(undefined))}
        onMouseEnter={() => dispatch(setActiveRect(props.v.r))}
        className={classNames({highlighted: isActive})}>
        {props.v.var}
      </span>
    )
  }
}