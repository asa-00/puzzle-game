import React from "react";

export interface LevelConfig {
  level: number;
  reward: string;
  unlocks: string[];
  challenge?: {
    description: string;
    condition: string; 
  };
}

export const levels: LevelConfig[] = [
  { level: 1, reward: "Welcome!", unlocks: [] },
  { level: 2, reward: "Auto Hint unlocked!", unlocks: ["autoHint"] },
  { level: 3, reward: "Challenge: No hints!", unlocks: ["challenge"], challenge: { description: "Solve without hints", condition: "noHints" } },
  { level: 4, reward: "Challenge: Under 30 sec!", unlocks: ["challenge"], challenge: { description: "Solve quickly", condition: "fastSolve" } },
  { level: 5, reward: "Coach Challenge: Intense streak!", unlocks: ["challenge"], challenge: { description: "Get a 5-move streak", condition: "streak5" } },
];

interface ProgressionDashboardProps {
  currentLevel: number;
  unlockedFeatures: string[];
}

const ProgressionDashboard: React.FC<ProgressionDashboardProps> = ({ currentLevel, unlockedFeatures }) => {
  return (
    <div className="progression-dashboard">
      <h3>📈 Progress Dashboard</h3>
      <p>Current Level: <strong>{currentLevel}</strong></p>
      <h4>Unlocked Features:</h4>
      <ul>
        {unlockedFeatures.map((feature, index) => (
          <li key={index}>✅ {feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressionDashboard;