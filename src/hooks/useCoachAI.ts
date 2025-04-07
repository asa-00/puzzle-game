import { useState, useEffect } from "react";
import { useCoachMemory } from "./useCoachMemory";
import { CoachStyle } from "../types/coach";

type Mood = "normal" | "tip" | "praise" | "boost";

export interface UseCoachAIParams {
  pattern: number[];
  grid: { active: boolean }[];
  hintAvailable: boolean;
  showHint: boolean;
  moodProfile: "struggling" | "focused" | "confident";
  rowStatuses: boolean[];
  colStatuses: boolean[];
  personality: CoachStyle;
}

export function useCoachAI({
  pattern,
  grid,
  hintAvailable,
  showHint,
  moodProfile,
  rowStatuses,
  colStatuses,
  personality,
}: UseCoachAIParams) {
  const [mood, setMood] = useState<Mood>("normal");
  const coachMemory = useCoachMemory();

  const getMatchRatio = () => {
    const correct = grid.filter((cell, i) => (cell.active ? 1 : 0) === pattern[i]).length;
    return correct / grid.length;
  };

  useEffect(() => {
    if (showHint || (hintAvailable && !showHint)) {
      setMood("tip");
    } else {
      const ratio = getMatchRatio();
      if (ratio === 1 || ratio > 0.8) {
        setMood("praise");
      } else {
        setMood("normal");
      }
    }
  }, [pattern, grid, hintAvailable, showHint]);

  const styleTips = {
    zen: "Focus on breathing and symmetry.",
    hype: "Move fast, trust your instincts!",
    wise: "Double-check rows and columns.",
    chill: "Take it easy, look for patterns.",
  };

  const gameplayTips = [
    "Try solving rows with fewer active cells.",
    "Look at column hints and find common positions.",
    "Start with corners—they're easy to verify.",
  ];

  const generateFeedback = () => {
    const matchRatio = getMatchRatio();
    const memoryMood = coachMemory.analyzeMood();
    const improving = coachMemory.isImproving();

    let message = "Let the pattern reveal itself – stay centered.";
    if (hintAvailable && !showHint) {
      message = "Need a little nudge? I'm ready to help.";
    } else if (showHint) {
      message = "Here's a clue to guide you! ✨";
    } else if (matchRatio === 1) {
      message = "Perfect match! You're on fire!";
    } else if (matchRatio > 0.8) {
      message = improving ? "You're improving fast! Great job!" : "Almost there – only a few pieces off.";
    } else if (matchRatio > 0.5) {
      message = memoryMood === "confident" ? "You're doing great – keep the streak!" : "You're halfway to the goal.";
    } else if (matchRatio > 0.25) {
      message = memoryMood === "struggling" ? "Take a breath – try the edges first." : "Some progress, try focusing on symmetry.";
    }

    return {
      message,
      style: {
        styleTip: styleTips[personality],
      },
      tip: gameplayTips[Math.floor(Math.random() * gameplayTips.length)],
    };
  };

  return {
    generateFeedback,
    mood,
  };
}
