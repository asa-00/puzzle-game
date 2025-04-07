import { CoachMemory } from "../hooks/useCoachMemory";

export const challengeConditions: Record<string, (memory: CoachMemory) => boolean> = {
  noHints: (memory) => memory.hintUsage === 0,
  fastSolve: (memory) => {
    const moves = memory.recentMoves;
    if (moves.length < 2) return false;
    const delta = moves[moves.length - 1].timestamp - moves[0].timestamp;
    return delta < 30000;
  },
  streak5: (memory) => {
    let streak = 0;
    for (let i = memory.recentMoves.length - 1; i >= 0; i--) {
      if (!memory.recentMoves[i].correct) break;
      streak++;
    }
    return streak >= 5;
  },
};
