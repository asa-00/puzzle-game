import React from "react";
import { CoachMemory } from "../hooks/useCoachMemory"; 
interface DevPanelProps {
  memory: CoachMemory;
}

const DevPanel: React.FC<DevPanelProps> = ({ memory }) => {
  return (
    <div className="dev-panel">
      <h2>🧠 Coach Memory</h2>
      <p><strong>Success Rate:</strong> {(memory.successRate * 100).toFixed(1)}%</p>
      <p><strong>Hint Usage:</strong> {memory.hintUsage}</p>
      <p><strong>Avg Reaction Time:</strong> {
        memory.reactionTime.length > 0
          ? `${(memory.reactionTime.reduce((a: any, b: any) => a + b) / memory.reactionTime.length).toFixed(0)} ms`
          : "–"
      }</p>
      <p><strong>Recent Moves:</strong></p>
      <ul>
        {memory.recentMoves.slice(-5).reverse().map((move: any, index: any) => (
          <li key={index}>
            {move.correct ? "✅" : "❌"} {new Date(move.timestamp).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DevPanel;
