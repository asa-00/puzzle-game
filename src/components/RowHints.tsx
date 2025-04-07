import React from "react";

interface RowHintsProps {
    rowHints: number[][];
    rowStatuses: boolean[];
  }
  
  const RowHints: React.FC<RowHintsProps> = ({ rowHints, rowStatuses }) => {
    return (
      <div className="row-hints">
        {rowHints.map((hint, i) => (
          <div key={i} className={`hint hint-row ${rowStatuses[i] ? "correct" : ""}`}>
            {hint.join(", ")}
          </div>
        ))}
      </div>
    );
  };
  
  export default RowHints;