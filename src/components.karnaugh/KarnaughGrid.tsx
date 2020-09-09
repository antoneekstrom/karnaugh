import React, { useEffect, CSSProperties } from 'react';
import './KarnaughGrid.css';
import { classNames } from '../components.ui/Common';
import { useDispatch } from 'react-redux';
import { useStoreSelector } from '../store';
import { setRects } from '../store/karnaugh';
import { Karnaugh, findMinRects, LINE_ORDER, binaryString, Cell, toGrayCode, splitVars, changeCellValue } from '../model/model';
import { range } from '../util';

export interface KarnaughGridProps {
  grid: Karnaugh,
  setGrid: (grid: Karnaugh) => void;
}

export default function KarnaughGrid(props: KarnaughGridProps) {
  const {grid, active} = useStoreSelector(state => ({...state.karnaugh}));
  const dispatch = useDispatch();

  useEffect(() => {
    const rects = findMinRects(grid);
    dispatch(setRects(rects));
  }, [grid]);

  const [varsX, varsY] = splitVars(grid);

  return (
    <div className="karnaugh" style={{'--varsX': Math.pow(2, varsX.length), '--varsY': Math.pow(2, varsY.length)} as CSSProperties}>
      <p>f</p>
      <Labels dir="row" vars={varsX}/>
      <Labels dir="col" vars={varsY} />
      <Grid {...props} />
    </div>
  )

  function Labels(props: {dir: 'row' | 'col', vars: string[]}) {
    const { dir } = props;

    return (
      <div className={classNames({row: dir == 'row', col: dir == 'col'}, 'label')}>
        <p>{props.vars.join('')}</p>
        <div>
          {
            range(Math.pow(2, props.vars.length)).map(i => (
              <p key={i}>
                {toGrayCode(i, Math.round(props.vars.length))}
              </p>
            ))
          }
        </div>
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

  function CellItem(props: {cell: Cell} & KarnaughGridProps) {
    const {cell, grid} = props;
    const isActive = active.includes(cell.index);

    return (
      <li
        className={classNames({active: isActive, one: cell.value == 1}, 'cell')}
        onClick={handlePrimaryClick}
        onAuxClick={handleAuxClick}
        onContextMenu={e => {console.log(e);}}>
        <p>
          {cell.value == 0 ? '0' : cell.value}
        </p>
      </li>
    )

    function handleAuxClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
      props.setGrid(changeCellValue(grid, cell.index, 0));
    }

    function handlePrimaryClick() {
      props.setGrid(changeCellValue(grid, cell.index, cell.value == 0 ? 1 : (cell.value == 1 ? '-' : (cell.value == '-' ? 0 : 1))));
    }
  }
}