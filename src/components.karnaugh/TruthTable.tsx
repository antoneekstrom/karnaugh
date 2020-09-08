import React, { CSSProperties } from 'react';
import { Karnaugh, Cell, cellIndexToNumber, binaryArray, varCount } from '../model/model';
import { classNames } from '../components.ui/Common';
import { useDispatch } from 'react-redux';
import { setGrid } from '../store/karnaugh';
import './TruthTable.css';

export interface TruthTableProps {
  grid: Karnaugh
}

export default function TruthTable(props: TruthTableProps) {
  const { grid} = props;
  const dispatch = useDispatch();
  
  return (
    <div className="truth-table" style={{'--varNum': grid.vars.length} as CSSProperties}>
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