import React from "react";

interface ColHintsProps {
    colHints: number[][];
    colStatuses: boolean[];
    gridSize: number;
  }
  
  const ColHints: React.FC<ColHintsProps> = ({ colHints, colStatuses, gridSize }) => {
    return (
      <div
        className="col-hints"
        style={{ gridTemplateColumns: `repeat(${gridSize + 1}, 1fr)` }}
      >
        <div className="empty-cell" />
        {colHints.map((hint, i) => (
          <div key={i} className={`hint hint-col ${colStatuses[i] ? "correct" : ""}`}>
            {hint.join(", ")}
          </div>
        ))}
      </div>
    );
  };
  
  export default ColHints;