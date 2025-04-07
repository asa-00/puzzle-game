import { motion } from "framer-motion";

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
}) => {
  return (
    <div className="board-wrapper">
      {/* Column Hints */}
      <div
        className="col-hints"
        style={{ gridTemplateColumns: `repeat(${gridSize + 1}, 1fr)` }}
      >
     {/*    <div className="empty-cell" />
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
            {/* Grid Cells for the row */}
            {Array.from({ length: gridSize }).map((_, colIndex) => {
              const index = rowIndex * gridSize + colIndex;
              const cell = grid[index];
              const isHint = showHint && hintIndexes.includes(cell.id);
              return (
                <motion.div
                  key={cell.id}
                  className={`cell ${cell.active ? "active" : "inactive"} ${
                    isHint ? "hint" : ""
                  }
                  ${
                    unlockedFeatures?.includes("tileAnimations")
                      ? "animated"
                      : ""
                  }
                  `}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleClick(cell.id)}
                />
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
