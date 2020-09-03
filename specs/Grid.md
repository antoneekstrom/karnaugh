# Grid
A karnaugh grid which wraps around itself when attempting to access
values outside the grid.

## Functions
 - `createGrid(): Grid`
 - `get(x, y): Cell`

## Grid class
```typescript
class KarnaughGrid {
	size: {width, height}
}
```

## Cell
```typescript
interface Cell {
	value: 0 | 1
	position: {x, y}
}
```

