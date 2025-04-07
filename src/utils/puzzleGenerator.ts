export interface LogicalPattern {
    grid: number[];
    gridSize: number;
    rowHints: number[];
    colHints: number[];
  }
  
  export function generateLogicalPattern(gridSize: number = 5): LogicalPattern {
    const grid = Array(gridSize * gridSize).fill(0);
    const rowHints = Array(gridSize).fill(0);
    const colHints = Array(gridSize).fill(0);
  
    const activePerRow = 3; 
  
    for (let row = 0; row < gridSize; row++) {
      const indices: number[] = [];
      while (indices.length < activePerRow) {
        const col = Math.floor(Math.random() * gridSize);
        if (!indices.includes(col)) indices.push(col);
      }
      indices.forEach((col) => {
        const index = row * gridSize + col;
        grid[index] = 1;
        rowHints[row]++;
        colHints[col]++;
      });
    }
  
    return {
      grid,
      gridSize,
      rowHints,
      colHints,
    };
  }
  