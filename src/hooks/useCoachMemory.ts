import { useRef } from "react";
import { Mood } from "../types/coach";
import usePersistentState from "../hooks/usePersistentState";

export type PlayerStyle = "explorer" | "methodical" | "intuitive" | "risky";

export type Challenge = {
    description: string;
    completed: boolean;
    condition: () => boolean;
};

export interface CoachMemory {
  successRate: number;
  recentMoves: { correct: boolean; timestamp: number }[];
  hintUsage: number;
  reactionTime: number[];
  streak: number;
  longestStreak: number;
  mistakeRate: number;
  challenge?: { description: string; condition: () => boolean };
  goalCompletions: Record<string, number[]>;
}

export function useCoachMemory() {
  const [persistedGoals, setPersistedGoals] = usePersistentState<Record<string, number[]>>("goalCompletions", {});

  const memory = useRef<CoachMemory>({
    successRate: 1,
    recentMoves: [],
    hintUsage: 0,
    reactionTime: [],
    streak: 0,
    longestStreak: 0,
    mistakeRate: 0,
    goalCompletions: persistedGoals,
  });

  const getHintsUsed = () => memory.current.hintUsage;
  const activeChallenge = useRef<Challenge | null>(null);

  const setChallenge = (description: string, condition: () => boolean) => {
    activeChallenge.current = { description, completed: false, condition };
  };

  const logGoalCompleted = (strategy: string, level: number) => {
    if (!memory.current.goalCompletions[strategy]) {
      memory.current.goalCompletions[strategy] = [];
    }
    if (!memory.current.goalCompletions[strategy].includes(level)) {
      memory.current.goalCompletions[strategy].push(level);
      setPersistedGoals({ ...memory.current.goalCompletions });
    }
  };
  
  const checkChallenge = () => {
    if (activeChallenge.current && !activeChallenge.current.completed) {
      const success = activeChallenge.current.condition();
      if (success) {
        activeChallenge.current.completed = true;
      }
    }
  };

  const getChallengeStatus = () => {
    return activeChallenge.current;
  };

  const logMove = (correct: boolean) => {
    const now = Date.now();
    const last = memory.current.recentMoves.slice(-1)[0];
    if (last) {
      memory.current.reactionTime.push(now - last.timestamp);
    }
    memory.current.recentMoves.push({ correct, timestamp: now });
    if (memory.current.recentMoves.length > 20) {
      memory.current.recentMoves.shift();
    }

    const correctMoves = memory.current.recentMoves.filter((m) => m.correct).length;
    memory.current.successRate = correctMoves / memory.current.recentMoves.length;

    if (correct) {
      memory.current.streak++;
      memory.current.longestStreak = Math.max(memory.current.longestStreak, memory.current.streak);
    } else {
      memory.current.streak = 0;
    }

    const mistakes = memory.current.recentMoves.filter((m) => !m.correct).length;
    memory.current.mistakeRate = mistakes / memory.current.recentMoves.length;
  };

  const logHintUsed = () => {
    memory.current.hintUsage++;
  };

  const resetMemory = () => {
    memory.current = {
      successRate: 1,
      recentMoves: [],
      hintUsage: 0,
      reactionTime: [],
      streak: 0,
      longestStreak: 0,
      mistakeRate: 0,
      goalCompletions: {},
    };
  };

  const analyzeMood = (): Mood => {
    const { successRate, hintUsage, reactionTime } = memory.current;
    const avgReaction = reactionTime.length
      ? reactionTime.reduce((a, b) => a + b, 0) / reactionTime.length
      : 0;

    if (successRate < 0.4 || hintUsage > 3) return "struggling";
    if (successRate > 0.8 && avgReaction < 4000) return "confident";
    return "focused";
  };

  const isImproving = (): boolean => {
    const moves = memory.current.recentMoves;
    if (moves.length < 8) return false;
    const early = moves.slice(0, 4).filter((m) => m.correct).length;
    const recent = moves.slice(-4).filter((m) => m.correct).length;
    return recent > early;
  };

  const analyzeStyle = (): PlayerStyle => {
    const { reactionTime, mistakeRate, hintUsage } = memory.current;
    const avgReaction = reactionTime.length
      ? reactionTime.reduce((a, b) => a + b, 0) / reactionTime.length
      : 0;

    if (hintUsage >= 3 && mistakeRate > 0.5) return "explorer";
    if (avgReaction < 3000 && mistakeRate < 0.2) return "methodical";
    if (avgReaction < 3000 && hintUsage <= 1) return "intuitive";
    return "risky";
  };

  const suggestStrategy = (): string => {
    const style = analyzeStyle();
    switch (style) {
      case "methodical":
        return "Try solving one row at a time with focus.";
      case "explorer":
        return "Take your time and reduce random clicks.";
      case "intuitive":
        return "Go with your gut, but double-check symmetry.";
      case "risky":
        return "Slow down and plan before clicking.";
      default:
        return "Keep going! You're doing great.";
    }
  };

  const getStreak = () => {
    const { recentMoves } = memory.current;
    let streak = 0;
    for (let i = recentMoves.length - 1; i >= 0; i--) {
      if (!recentMoves[i].correct) break;
      streak++;
    }
    return streak;
  }

  return {
    memory: memory.current,
    logMove,
    logHintUsed,
    resetMemory,
    analyzeMood,
    isImproving,
    analyzeStyle,
    suggestStrategy,
    getStreak,
    getHintsUsed,
    setChallenge,
    checkChallenge,
    getChallengeStatus,
    logGoalCompleted
  };
}
