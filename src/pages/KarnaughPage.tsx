import React, { Fragment, useState } from 'react';
import Panel from '../components.ui/Panel';
import KarnaughGrid from '../components.karnaugh/KarnaughGrid';
import { karnaugh, makeRect } from '../model';
import './KarnaughPage.css';
import Button from '../components.ui/Button';

export default function KarnaughPage() {
  const [grid, setGrid] = useState(karnaugh(4));

  return (
    <div className="karnaugh-page">
      <header>
        <h1>KARNAUGH</h1>
      </header>
      <main>
        <KarnaughGrid grid={grid} setGrid={setGrid} />
      </main>
    </div>
  )
}