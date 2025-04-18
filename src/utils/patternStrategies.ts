export type PatternStrategy = (size: number) => {
  pattern: number[];
  rowHints: number[][];
  colHints: number[][];
};

/**
 * 1. Diagonal pattern (top-left to bottom-right)
 */
export const diagonalPattern: PatternStrategy = (size) => {
  const pattern = Array(size * size).fill(0);
  const rowHints: number[][] = [];
  const colHints: number[][] = Array.from({ length: size }, () => []);

  for (let i = 0; i < size; i++) {
    const idx = i * size + i;
    pattern[idx] = 1;
    rowHints.push([i]);
    colHints[i].push(i);
  }

  return { pattern, rowHints, colHints };
};

/**
 * 2. Mirror horizontally (left-right)
 */
export const mirrorHorizontalPattern: PatternStrategy = (size) => {
  const pattern = Array(size * size).fill(0);
  const rowHints: number[][] = [];
  const colHints: number[][] = Array.from({ length: size }, () => []);

  for (let row = 0; row < size; row++) {
    const hint: number[] = [];
    const mid = Math.floor(size / 2);
    for (let col = 0; col < mid; col++) {
      const value = Math.random() > 0.5 ? 1 : 0;
      pattern[row * size + col] = value;
      pattern[row * size + (size - col - 1)] = value;
      if (value === 1) {
        hint.push(col, size - col - 1);
        colHints[col].push(row);
        colHints[size - col - 1].push(row);
      }
    }
    if (size % 2 === 1) {
      const centerCol = mid;
      const centerValue = Math.random() > 0.5 ? 1 : 0;
      pattern[row * size + centerCol] = centerValue;
      if (centerValue === 1) {
        hint.push(centerCol);
        colHints[centerCol].push(row);
      }
    }
    rowHints.push(hint.sort((a, b) => a - b));
  }

  return { pattern, rowHints, colHints };
};

/**
 * 3. Checkered pattern
 */
export const checkeredPattern: PatternStrategy = (size) => {
  const pattern = Array(size * size).fill(0);
  const rowHints: number[][] = [];
  const colHints: number[][] = Array.from({ length: size }, () => []);

  for (let row = 0; row < size; row++) {
    const hint: number[] = [];
    for (let col = 0; col < size; col++) {
      if ((row + col) % 2 === 0) {
        pattern[row * size + col] = 1;
        hint.push(col);
        colHints[col].push(row);
      }
    }
    rowHints.push(hint);
  }

  return { pattern, rowHints, colHints };
};

/**
 * 4. Cluster in center
 */
export const centerClusterPattern: PatternStrategy = (size) => {
  const pattern = Array(size * size).fill(0);
  const rowHints: number[][] = Array.from({ length: size }, () => []);
  const colHints: number[][] = Array.from({ length: size }, () => []);
  const center = Math.floor(size / 2);
  const range = Math.floor(size / 3);

  for (let row = center - range; row <= center + range; row++) {
    for (let col = center - range; col <= center + range; col++) {
      if (row >= 0 && col >= 0 && row < size && col < size) {
        pattern[row * size + col] = 1;
        rowHints[row].push(col);
        colHints[col].push(row);
      }
    }
  }

  return { pattern, rowHints, colHints };
};

/**
 * 5. Deductive: one active cell per row, unique column
 */
export const deductiveOnePerLine: PatternStrategy = (size) => {
  const pattern = Array(size * size).fill(0);
  const rowHints: number[][] = [];
  const colHints: number[][] = Array.from({ length: size }, () => []);
  const columns = Array.from({ length: size }, (_, i) => i);

  for (let i = columns.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [columns[i], columns[j]] = [columns[j], columns[i]];
  }

  for (let row = 0; row < size; row++) {
    const col = columns[row];
    pattern[row * size + col] = 1;
    rowHints.push([col]);
    colHints[col].push(row);
  }

  return { pattern, rowHints, colHints };
};

export const patternStrategies: Record<string, PatternStrategy> = {
  "logic-one-per-row": deductiveOnePerLine,
  "mirror-horizontal": mirrorHorizontalPattern,
  "cluster-center": centerClusterPattern,
  "diagonal": diagonalPattern,
  "checkered": checkeredPattern,
};

export const selectPatternStrategy = (
  size: number
): { strategyName: string; strategy: PatternStrategy } => {
  const keys = Object.keys(patternStrategies);
  const strategyName = keys[Math.floor(Math.random() * keys.length)];
  return { strategyName, strategy: patternStrategies[strategyName] };
};
