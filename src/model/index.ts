
export function karnaughTest() {
    const k = karnaugh(4);
}

export type VariableCount = 2 | 4
export type Position = {x: number, y: number}

export interface Cell {
    index: number;
    value: boolean;
}

export interface Karnaugh {
    varCount: VariableCount
    cells: Cell[]
}

export function makeRect(k: Karnaugh, w: number, h: number, pos: Position): number[] {
    const r = []
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const p = {...pos};
            p.x += x;
            p.y += y;
            r.push(positionToIndex(k, p));
        }
    }
    return r;
}

export function moveRect(k: Karnaugh, rect: number[], delta: Position): number[] {
    const moved = [];

    for (const i of rect) {
        let movedPos = addPos(indexToPosition(k, i), delta);
        movedPos = wrapPosition(k, movedPos);

        console.log(movedPos);

        moved.push(positionToIndex(k, movedPos));
    }

    return moved;
}

export function addPos(a: Position, b: Position) {
    return {
        x: a.x + b.x,
        y: a.y + b.y
    }
}

export function karnaugh(varCount: VariableCount) : Karnaugh {
    let cells: Cell[] = []

    for (let i = 0; i < varCount * varCount; i++) {
        cells[i] = {index: i, value: false}
    }

    return { cells, varCount }
}

export function clone(k: Karnaugh): Karnaugh {
    return {
        cells: k.cells,
        varCount: k.varCount
    }
}

export function indexToPosition(k: Karnaugh, index: number): Position {
    return {
        x: Math.floor(index % k.varCount),
        y: Math.floor(index / k.varCount)
    }
}

export function positionToIndex(k: Karnaugh, pos: Position): number {
    const {x, y} = wrapPosition(k, pos);
    return y * k.varCount + x;
}

export function getCellByIndex(k: Karnaugh, index: number) : Cell {
    return k.cells.find(c => c.index == index);
}

export function wrapPosition(k: Karnaugh, pos: Position): Position {
    const wrapped: Position = {...pos};

    if (wrapped.x >= k.varCount) {
        wrapped.x = wrapped.x % k.varCount;
    }
    else if (wrapped.x < 0) {
        wrapped.x = k.varCount - (k.varCount - wrapped.x)
    }

    if (wrapped.y >= k.varCount) {
        wrapped.y = wrapped.y % k.varCount;
    }
    else if (wrapped.y < 0) {
        wrapped.y = k.varCount - (k.varCount - wrapped.y)
    }

    return wrapped;
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