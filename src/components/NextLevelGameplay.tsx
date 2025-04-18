// 🎮 Next-Level Gameplay Expansion (Hidden Pattern + Memory Tiles)

import { useEffect, useState, useRef } from "react";

interface NextLevelGameplayProps {
  pattern: number[];
  gridSize: number;
  setGridActive: (index: number, active: boolean) => void;
  startGame: () => void;
  onPatternPreviewEnd?: () => void;
}

const NextLevelGameplay: React.FC<NextLevelGameplayProps> = ({
  pattern,
  gridSize,
  setGridActive,
  startGame,
  onPatternPreviewEnd,
}) => {
  const [showPattern, setShowPattern] = useState(true);
  const [memoryTiles, setMemoryTiles] = useState<number[]>([]);

  useEffect(() => {
    const activeIndexes = pattern
      .map((val, idx) => (val === 1 ? idx : -1))
      .filter((idx) => idx !== -1);
    const shuffled = [...activeIndexes].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.floor(activeIndexes.length / 3));
    setMemoryTiles(selected);
  }, [pattern]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPattern(false);
      startGame();
      onPatternPreviewEnd?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [startGame, onPatternPreviewEnd]);

  return (
    <div className="pattern-overlay">
      {showPattern && (
        <div className="preview-grid">
          {pattern.map((val, index) => (
            <div
              key={index}
              className={`preview-cell ${val === 1 ? "highlight" : ""} ${memoryTiles.includes(index) ? "memory-flash" : ""}`}
              style={{
                width: `${100 / gridSize}%`,
                height: `${100 / gridSize}%`,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NextLevelGameplay;