import React, { useState, useEffect } from 'react';
import './KarnaughPage.css';
import Page from '../components.ui/Page';
import Toggle from '../components.ui/Toggle';
import KarnaughGrid from '../components.karnaugh/KarnaughGrid';
import { setTheme } from '../store/preferences';
import { useDispatch } from 'react-redux';
import { useStoreSelector } from '../store';
import { setActiveRect, setGrid } from '../store/karnaugh';
import { rectExpression, Expression, cellIndexToNumber, binaryArray, VAR_NAMES, Rect, varCount, Cell } from '../model/model';
import { classNames } from '../components.ui/Common';
import { MaterialIcon } from '../components.ui/Icon';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';

export default function KarnaughPage() {
  const {theme, grid, rects, activeRect} = useStoreSelector(state => ({...state.karnaugh, ...state.preferences}));
  const dispatch = useDispatch();

  return (
    <Page className="karnaugh-page">
      <header>
        <div>
          <Toggle value={theme == 'dark'} onChange={() => dispatch(setTheme(theme == 'dark' ? 'light' : 'dark'))}>Dark Theme</Toggle>
          <Link to="/debug">debug</Link>
        </div>
      </header>
      <main>
        <div>
          <h1>Karnaugh</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore culpa, provident totam labore omnis dignissimos eveniet est a expedita debitis sint dolores reprehenderit!</p>
          <Settings/>
        </div>
        <div>
          <KarnaughGrid grid={grid} setGrid={grid => dispatch(setGrid(grid))} />
          <Expression exp={rectExpression(grid, rects)}/>
          <RectList/>
        </div>
        <TruthTable/>
      </main>
    </Page>
  )

  function Expression(props: {exp: Expression}) {
    const [clipboard, setClipboard] = useState(false);
    return (
      <div className="expression">
        <h2>
          {
            props.exp.rectVars.length > 0 ? props.exp.rectVars.map((v, i) => <Part key={i} v={v}/>) : 'f ='
          }
        </h2>
        <button onClick={saveToClipboard}>
          <MaterialIcon>content_paste</MaterialIcon>
          <CSSTransition
            classNames="clipboard"
            in={clipboard}
            timeout={{enter: 1000}}
            onEntered={() => setClipboard(false)}
            >
            <span className="clipboard">Saved to clipboard!</span>
          </CSSTransition>
        </button>
      </div>
    )

    function saveToClipboard() {
      if (navigator?.clipboard) {
        navigator.clipboard.writeText(props.exp.expression);
      }
      else {
        document.execCommand('copy')
      }
      setClipboard(true);
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

  function TruthTable() {
    return (
      <div className="truth-table">
        <div className="table-header">
          {
            [...grid.vars.map((n, i) => <p key={i}>{n}</p>), <p key={'poo'}>f</p>]
          }
        </div>
        <div>
          <ol className="list">
            {
              grid.cells.map((c, i) => <Row key={i} cell={c} />)
              }
          </ol>
        </div>
      </div>
    )
    
    function Row(props: {cell: Cell}) {
      const {cell} = props;
      const b = cellIndexToNumber(grid, cell.index);
      return (
        <li className={classNames({ one: cell.value })}>
          {[...binaryArray(b, varCount(grid)).map((n, i) => <p key={i}>{n}</p>)]}
          <p className="f" onClick={handleClick} key={'poo'}>{cell.value ? 1 : 0}</p>
        </li>
      )

      function handleClick(e) {
        const copy = {...grid}
        copy.cells[cell.index] = {index: cell.index, value: !cell.value};
        dispatch(setGrid(copy));
      }
    }
  }

  function RectList() {
    return (
      <ol className="list rect-list">
        {
          rects.map((r, i) => (
            <li className="list-item" key={i} onMouseEnter={() => dispatch(setActiveRect(r))} onMouseLeave={() => dispatch(setActiveRect(undefined))}>
              <h3>
                {`${r.width}x${r.height}`}
              </h3>
            </li>
          ))
        }
      </ol>
    )
  }
}

function Settings() {
  const grid = useStoreSelector(s => s.karnaugh.grid);
  const [vars, setVars] = useState(grid.vars.join(', '));
  const dispatch = useDispatch();
  useEffect(() => setVars(grid.vars.join(', ')), [grid])
  return (
    <div>
      <h2>Settings</h2>
      <form onSubmit={e => submit(e)}>
        <input
          type="text"
          value={vars}
          onChange={e => setVars(e.currentTarget.value)}
        />
      </form>
      <h2>{grid.vars}</h2>
    </div>
  )

  function submit(e: React.FormEvent<HTMLFormElement>) {
    dispatch(setGrid({...grid, vars: vars.replace(/ /g, '').split(',')}));
    e.preventDefault();
  }
}