import React from "react";
import { motion } from "framer-motion";
import { CoachMemory, PlayerStyle } from "../hooks/useCoachMemory";

interface CoachInsightsProps {
  memory: CoachMemory;
  mood: "struggling" | "focused" | "confident";
  style: PlayerStyle;
  strategy: string;
  streak: number;
  personality: string;
}

const CoachInsights: React.FC<CoachInsightsProps> = ({
  memory,
  mood,
  style,
  strategy,
  streak,
  personality,
}) => {
  return (
    <div className="coach-insights">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>🧠 Coach Insights</h2>

        <div className="insight-row">
          <span className="label">Current Mood</span>
          <span className="value">{mood}</span>
        </div>

        <div className="insight-row">
          <span className="label">Player Style</span>
          <span className="value">{style}</span>
        </div>

        <div className="insight-row">
          <span className="label">Success Rate</span>
          <span className="value">{Math.round(memory.successRate * 100)}%</span>
        </div>

        <div className="insight-row">
          <span className="label">Mistake Rate</span>
          <span className="value">{Math.round(memory.mistakeRate * 100)}%</span>
        </div>

        <div className="insight-row">
          <span className="label">Hints Used</span>
          <span className="value">{memory.hintUsage}</span>
        </div>

        <div className="insight-row">
          <span className="label">Streak</span>
          <span className="value">{streak}</span>
        </div>

        <div className="insight-row">
          <span className="label">Longest Streak</span>
          <span className="value">{memory.longestStreak}</span>
        </div>

        <div className="style-hint">
          <strong>Coach advice:</strong> {strategy}
        </div>

        <div className="tone">Powered by your {personality} coach</div>
      </motion.div>
    </div>
  );
};

export default CoachInsights;
