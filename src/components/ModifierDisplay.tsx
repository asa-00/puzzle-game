// ✅ ModifierDisplay.tsx - visar ikoner för aktiva modifierare
import React from "react";
import Tooltip from "react-tooltip-lite";

interface ModifierDisplayProps {
  modifiers: string[];
}

const modifierLabels: Record<string, string> = {
  mirrorX: "Mirror Horizontally",
  mirrorY: "Mirror Vertically",
  rotate90: "Rotate 90°",
  shuffleRows: "Shuffle Rows",
};

const ModifierDisplay: React.FC<ModifierDisplayProps> = ({ modifiers }) => {
  if (modifiers.length === 0) return null;

  return (
    <div className="modifier-display">
      <span className="mod-title">🧪 Active Modifiers:</span>
      <div className="mod-icons">
        {modifiers.map((mod) => (
          <div
            key={mod}
            className="modifier-icon"
            title={modifierLabels[mod] || mod}
          >
            <span className={`mod-icon mod-${mod}`}>{modifierLabels[mod] || mod}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModifierDisplay;
