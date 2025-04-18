// Inuti useCoachAI.ts
import { CoachStyle, Mood, CoachFeedback } from '../types/coach';
import { Cell } from '../types/grid';

export const levelUpLines: Record<CoachStyle, string> = {
  zen: "You've reached a new level of focus.",
  hype: "Level up! You're on fire!",
  wise: "New level achieved. Let the wisdom grow.",
  chill: "Hey, nice! Leveled up without breaking a sweat.",
};

export const closingLines: Record<CoachStyle, string> = {
  zen: "Let’s return to stillness.",
  hype: "That was epic! Let’s take a breather.",
  wise: "Your training is complete—for now.",
  chill: "Cool session. Catch you next time!",
};

export function useCoachAI(input: {
  pattern: number[];
  grid: Cell[];
  hintAvailable: boolean;
  showHint: boolean;
  rowStatuses: boolean[];
  colStatuses: boolean[];
  moodProfile: Mood;
  personality: CoachStyle;
  strategyName?: string; 
}) {
  const {
    pattern,
    grid,
    hintAvailable,
    showHint,
    rowStatuses,
    colStatuses,
    moodProfile,
    personality,
    strategyName = "random",
  } = input;

  const total = grid.length;
  const correct = grid.filter((cell, i) => (cell.active ? 1 : 0) === pattern[i]).length;
  const matchRatio = correct / total;

  const isDeductive = strategyName?.startsWith("logic-");

  const generateFeedback = (): CoachFeedback => {
    if (isDeductive) {
      // Extra stödjande för logikbaserade mönster
      if (matchRatio < 0.4) {
        return {
          message: "Look closely — every row has a clue. Deduce, don’t guess.",
          style: { mood: "tip", styleTip: "Focus on rows with fewer options." },
          tip: "Try solving a single row completely first.",
        };
      }
      if (matchRatio >= 0.4 && matchRatio < 0.8) {
        return {
          message: "You're on the right track. Let logic guide you.",
          style: { mood: "normal", styleTip: "Think column by column now." },
          tip: "Cross-check rows and columns. Each must match hints.",
        };
      }
      if (matchRatio >= 0.8) {
        return {
          message: "Sharp deduction! You're cracking the code.",
          style: { mood: "praise", styleTip: "Keep analyzing patterns!" },
          tip: "One or two cells left — validate against both hints.",
        };
      }
    } else {
      // fallback till vanliga feedback (som ni redan har)
      return {
        message: "Keep going!",
        style: { mood: "normal", styleTip: "Just keep clicking." },
        tip: "",
      };
    }
    return {
      message: "Keep going!",
      style: { mood: "normal", styleTip: "Just keep clicking." },
      tip: "",
    };
  };

  return {
    generateFeedback,
    mood: moodProfile,
    strategyName
  };
}
