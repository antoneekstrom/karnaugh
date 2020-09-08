import React, { useState, useEffect } from 'react';
import './MainPage.css';
import Page from '../components.ui/Page';
import Toggle from '../components.ui/Toggle';
import KarnaughGrid from '../components.karnaugh/KarnaughGrid';
import Expression from '../components.karnaugh/Expression';
import { setTheme } from '../store/preferences';
import { useDispatch } from 'react-redux';
import { useStoreSelector } from '../store';
import { setActiveRect, setGrid } from '../store/karnaugh';
import { rectExpression, karnaugh } from '../model/model';
import { Link } from 'react-router-dom';
import TruthTable from '../components.karnaugh/TruthTable';

export default function KarnaughPage() {
  const {theme, grid, rects} = useStoreSelector(state => ({...state.karnaugh, ...state.preferences}));
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
        <TruthTable grid={grid} />
      </main>
    </Page>
  )

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
    dispatch(setGrid(karnaugh(vars.replace(/ /g, '').split(','))));
    e.preventDefault();
  }
}