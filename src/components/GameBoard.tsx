import { motion } from "framer-motion";
import ColHints from "./ColHints";
import RowHints from "./RowHints";

interface GameBoardProps {
  grid: { id: number; active: boolean }[];
  gridSize: number;
  handleClick: (index: number) => void;
  showHint?: boolean;
  hintIndexes?: number[];
  unlockedFeatures?: string[];
  rowHints?: number[][];
  colHints?: number[][];
  rowStatuses?: boolean[];
  colStatuses?: boolean[];
  modifiers: string[];
  bonusTileIndex: number | null;
  bonusActive: boolean;
  mutationEffect?: boolean;
  debugHints: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({
  grid,
  gridSize,
  handleClick,
  showHint = false,
  hintIndexes = [],
  rowHints = [],
  colHints = [],
  rowStatuses = [],
  colStatuses = [],
  unlockedFeatures = [],
  modifiers,
  bonusTileIndex,
  bonusActive,
  mutationEffect = false,
  debugHints = false
}) => {
  const isMirroredX = modifiers.includes("mirrorX");
  const isMirroredY = modifiers.includes("mirrorY");
  const isRotated = modifiers.includes("rotate90");
  const isShuffled = modifiers.includes("shuffleRows");

  const transformedIndex = (i: number) => {
    let row = Math.floor(i / gridSize);
    let col = i % gridSize;

    if (isMirroredX) col = gridSize - col - 1;
    if (isMirroredY) row = gridSize - row - 1;

    if (isRotated) {
      const temp = row;
      row = col;
      col = gridSize - 1 - temp;
    }

    return row * gridSize + col;
  };

  return (
    <div className={`board-wrapper ${mutationEffect ? "mutation-flash" : ""}`}>
      {/* Column Hints */}
      <div
        className="col-hints"
        style={{ gridTemplateColumns: `repeat(${gridSize + 1}, 1fr)` }}
      >
        <div className="col-hint-row">
     {/*    <div className="hint-spacer" />
        <ColHints    
              colHints={colHints}
              colStatuses={colStatuses}
              gridSize={gridSize}
            /> */}
      </div>
        {/* <div className="empty-cell" />
        {colHints.map((col, i) => (
          <div
            key={i}
            className={`hint hint-col ${
              colStatuses[i] === false ? "hint-warning" : ""
            }`}
          >
            {col.join(", ")}
          </div>
        ))} */}
      </div>

      {/* Game Board Rows */}
      <div className="board-grid">
      <RowHints rowHints={rowHints} rowStatuses={rowStatuses} />
      <div
        className="grid-with-hints"
        style={{
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          gridTemplateColumns: `auto repeat(${gridSize}, 1fr)`,
        }}
      >
        {Array.from({ length: gridSize }).map((_, rowIndex) => (
          <>
            <div />
            {Array.from({ length: gridSize }).map((_, colIndex) => {
              const index = rowIndex * gridSize + colIndex;
              const transformed = transformedIndex(index);
              const cell = grid[transformed];
              const isHint = (showHint || debugHints) && hintIndexes.includes(cell.id);
              const isBonus = bonusActive && cell.id === bonusTileIndex;

              return (
                <motion.div
                  key={cell.id}
                  className={`cell ${cell.active ? "active" : "inactive"} ${isHint ? "hint" : ""}
                  ${
                    unlockedFeatures?.includes("tileAnimations") ? "animated" : ""
                  } ${isBonus ? "bonus" : ""}`}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleClick(cell.id)}
                />
              );
            })}
          </>
        ))}
      </div>
      </div>
    </div>
  );
};

export default GameBoard;
