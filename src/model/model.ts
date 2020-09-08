
export type VariableCount = 2 | 4
export type Position = {x: number, y: number}

export interface Cell {
    index: number;
    value: boolean;
}

export interface Karnaugh {
    vars: string[]
    cells: Cell[]
}

export interface Rect {
    indices: number[]
    width: number
    height: number
}

export type Expression = {r: Rect, var: string}[]
export type ExpForm = 'disjunctive' | 'conjunctive';

export const VAR_NAMES = ['x', 'y', 'z', 'w']
export const LINE_ORDER = [0, 1, 3, 2]

export function toGrayCode(num: number, len = 4): string {
    return binaryString(num ^ (num >> 1), len);
}

export function expJoinCharacter(f: ExpForm) {
    return f == 'disjunctive' ? '+' : ''
}

export function expToString(exp: Expression, f: ExpForm): string {
    return exp.map(v => v.var).join(expJoinCharacter(f));
}

export function rectExpression(k: Karnaugh, rects: Rect[], f: ExpForm): Expression {
    return rects.map(r => ({var: `(${constantVars(k, r.indices).map(rv => rv.var + (rv.value == 1 ? '' : "'")).join(expJoinCharacter(f))})`, r}));
}

export function constantVars(k: Karnaugh, indices: number[]): {value: number, var: string}[] {
    let vars: boolean[] = []
    for (let i = 0; i < varCount(k); i++) {
        vars[i] = true;
    }

    const binIndices = indices.map(i => binaryArray(cellIndexToNumber(k, i), varCount(k)));
    let prev = binIndices[0];
    for (const b of binIndices) {
        vars = b.map((n, i) => {
            return prev[i] == n ? vars[i] : false;
        });
        prev = b;
    }

    
    const arr= vars.map((v, i) => v ? {value: prev[i], var: k.vars[i]} : undefined).filter(v => v != undefined);
    return arr;
}

export function findMinRects(k: Karnaugh, value: boolean = true): Rect[] {
    // find all possible rects
    const all = [
        ...findRects(k, makeRect(k, 4, 4), value),
        ...findRects(k, makeRect(k, 2, 4), value),
        ...findRects(k, makeRect(k, 4, 2), value),
        ...findRects(k, makeRect(k, 4, 1), value),
        ...findRects(k, makeRect(k, 1, 4), value),
        ...findRects(k, makeRect(k, 2, 2), value),
        ...findRects(k, makeRect(k, 1, 2), value),
        ...findRects(k, makeRect(k, 2, 1), value),
        ...findRects(k, makeRect(k, 1, 1), value),
    ];

    let min: Rect[] = [];

    // remove unneccessary rects
    for (const rect of all) {
        let minIndices: number[] = min.reduce((v: number[], c) => [...v, ...c.indices], []);
        
        if (!rect.indices.every(i => minIndices.includes(i))) {
            min.push(rect);
            minIndices = [...minIndices, ...rect.indices];
        }

        // if all values are covered by a rect, exit
        if (k.cells.filter(c => c.value == value).every(c => minIndices.includes(c.index))) {
            break;
        }
    }

    min = min.filter(r => {
        const withoutR = min.filter(r2 => r2 != r);
        const withoutRIndices = withoutR.reduce((v: number[], c) => [...v, ...c.indices], []);
        const obsolete = r.indices.every(i => withoutRIndices.includes(i));
        return !obsolete;
    })

    return min;
}

export function findRects(k: Karnaugh, rect: Rect, value: boolean): Rect[] {
    let r = {...rect};
    let rects = [];

    for (let y = 0; y < varCount(k); y++) {
        for (let x = 0; x < varCount(k); x++) {    
            r = moveRect(k, r, {x: 1, y: 0});
            
            const isFilled = k.cells.filter(c => r.indices.includes(c.index)).map(c => c.value).reduce((v, c) => v = c == value ? v : false, true);
            if (isFilled) {
                rects.push(r);
            }
        }
        r = moveRect(k, r, {x: 0, y: 1});
    }

    return rects;
}

export function makeRect(k: Karnaugh, w: number, h: number, pos: Position = {x: 0, y: 0}): Rect {
    const r = {indices: [], width: w, height: h}
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const p = {...pos};
            p.x += x;
            p.y += y;
            r.indices.push(positionToIndex(k, p));
        }
    }
    return r;
}

export function moveRect(k: Karnaugh, rect: Rect, delta: Position): Rect {
    const moved = [];

    for (const i of rect.indices) {
        let movedPos = addPos(indexToPosition(k, i), delta);
        movedPos = wrapPosition(k, movedPos);

        moved.push(positionToIndex(k, movedPos));
    }

    return {...rect, indices: moved};
}

export function comparePos(a: Position, b: Position) {
    return a.x == b.x && a.y == b.y;
}

export function addPos(a: Position, b: Position) {
    return {
        x: a.x + b.x,
        y: a.y + b.y
    }
}

export function cellIndexToNumber(k: Karnaugh, index: number) {
    const {x, y} = indexToPosition(k, index);
    return Number.parseInt(toGrayCode(y).slice(2, 4) + toGrayCode(x).slice(2, 4), 2);
}

export function splitVars(k: Karnaugh): [string[], string[]] {
    const varsX = k.vars.slice(0, Math.floor(k.vars.length / 2));
    const varsY = k.vars.slice(varsX.length);
    return [varsX, varsY];
}

export function karnaugh(vars: string[]) : Karnaugh {
    let cells: Cell[] = []
    const varCount = vars.length;
    const k = { cells, vars };
    const [x, y] = splitVars(k);

    for (let i = 0; i < Math.pow(2, x.length) * Math.pow(2, y.length); i++) {
        cells[i] = {index: i, value: false}
    }

    return k
}

export function indexToPosition(k: Karnaugh, index: number): Position {
    return {
        x: Math.floor(index % varCount(k)),
        y: Math.floor(index / varCount(k))
    }
}

export function positionToIndex(k: Karnaugh, pos: Position): number {
    const {x, y} = wrapPosition(k, pos);
    return y * varCount(k) + x;
}

export function getCellByIndex(k: Karnaugh, index: number) : Cell {
    return k.cells.find(c => c.index == index);
}

export function wrapPosition(k: Karnaugh, pos: Position): Position {
    const wrapped: Position = {...pos};
    const [varsX, varsY] = splitVars(k);
    const vcx = Math.pow(2, varsX.length);
    const vcy = Math.pow(2, varsY.length);


    if (wrapped.x >= varCount(k)) {
        wrapped.x = wrapped.x % vcx;
    }
    else if (wrapped.x < 0) {
        wrapped.x = vcx + (wrapped.x % vcx)
    }

    if (wrapped.y >= vcy) {
        wrapped.y = wrapped.y % vcy;
    }
    else if (wrapped.y < 0) {
        wrapped.y = vcy + (wrapped.y % vcy)
    }

    return wrapped;
}

export function varCount(k: Karnaugh) {
    return k.vars.length;
}

export function getCellByPos(k: Karnaugh, pos: Position) {
    const index = positionToIndex(k, pos);
    return k.cells[index];
}

export function binaryString(num: number, len = 4): string {
    return num.toString(2).padStart(len, "0");
}

export function binaryArray(num: number, len = 4): number[] {
    return binaryString(num, len).split("").map(c => Number.parseInt(c));
}