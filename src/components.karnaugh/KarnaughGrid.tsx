import React, { useState, useEffect, Fragment } from 'react';
import * as Model from '../model';
import './KarnaughGrid.css';
import { classNames } from '../components.ui/Common';
import { useInterval } from '../util';
import Button from '../components.ui/Button';

const LINE_ORDER = [0, 1, 3, 2];

export interface KarnaughGridProps {
  grid: Model.Karnaugh,
  setGrid: (grid: Model.Karnaugh) => void;
}

export default function KarnaughGrid(props: KarnaughGridProps) {
  const {grid} = props;

  const [cube, setCube] = useState(Model.makeRect(Model.karnaugh(4), 2, 2, {x: 0, y: 0}));

  return (
    <Fragment>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Button onClick={left}>left</Button>
        <Button onClick={right}>right</Button>
        <Button onClick={up}>up</Button>
        <Button onClick={down}>down</Button>
      </div>
      <div className="karnaugh">
        <div/>
        <Labels dir="row"/>
        <Labels dir="col"/>
        <Grid {...props} />
      </div>
    </Fragment>
  )

  function left() {
    setCube(Model.moveRect(grid, cube, {x: -1, y: 0}));
  }

  function right() {
    setCube(Model.moveRect(grid, cube, {x: 1, y: 0}));
  }

  function up() {
    setCube(Model.moveRect(grid, cube, {x: 0, y: 1}));
  }

  function down() {
    setCube(Model.moveRect(grid, cube, {x: 0, y: -1}));
  }

  function Labels(props: {dir: 'row' | 'col'}) {
    const { dir } = props;
    return (
      <div className={classNames({row: dir == 'row', col: dir == 'col'}, 'label')}>
        {
          LINE_ORDER.map(i => (
            <p key={i}>
              {Model.binaryString(i, 2)}
            </p>
          ))
        }
      </div>
    )
  }

  function Grid(props: KarnaughGridProps) {
    return (
      <ol className="karnaugh">
        {props.grid.cells.map(cell => <CellItem key={cell.index} cell={cell} {...props} />)}
      </ol>
    )
  }

  function CellItem(props: {cell: Model.Cell} & KarnaughGridProps) {
    const {cell, grid} = props;
    const {x, y} = Model.indexToPosition(grid, cell.index);
    const pee = cube.includes(cell.index);

    return (
      <li className={classNames({active: pee}, 'cell')} onClick={handleClick}>
        <p>
          {cell.value ? '1' : '0'}
        </p>
      </li>
    )

    function handleClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
      const copy = Model.clone(grid);
      copy.cells[cell.index] = {index: cell.index, value: !cell.value};
      props.setGrid(copy);
    }
  }
}