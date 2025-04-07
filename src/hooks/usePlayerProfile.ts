// 🎮 usePlayerProfile.ts - Tracks user behavior and returns an adaptive player profile
import { useState, useEffect } from "react";

export type PlayerType = "strategist" | "trialAndError" | "calmExplorer";

interface GameEvent {
  reactionTime: number;
  wasCorrect: boolean;
  timestamp: number;
}

export const usePlayerProfile = (events: GameEvent[]) => {
  const [playerType, setPlayerType] = useState<PlayerType>("calmExplorer");

  useEffect(() => {
    if (events.length < 5) return;

    const avgTime =
      events.reduce((acc, e) => acc + e.reactionTime, 0) / events.length;
    const correctCount = events.filter((e) => e.wasCorrect).length;
    const correctRatio = correctCount / events.length;

    if (avgTime < 800 && correctRatio > 0.7) {
      setPlayerType("strategist");
    } else if (correctRatio < 0.4) {
      setPlayerType("trialAndError");
    } else {
      setPlayerType("calmExplorer");
    }
  }, [events]);

  return playerType;
};
