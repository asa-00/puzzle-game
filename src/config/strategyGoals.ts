export type StrategyGoal = {
    timeLimit?: number; // Max time in seconds
    maxMistakes?: number; // Max allowed mistakes
    maxHints?: number; // Max allowed hint usage
  };
  
  export const strategyGoals: Record<string, StrategyGoal> = {
    deductiveOnePerLine: {
      timeLimit: 30,
      maxMistakes: 2,
      maxHints: 0,
    },
    diagonal: {
      timeLimit: 45,
      maxMistakes: 3,
    },
    cluster: {
      maxHints: 1,
    },
    mirror: {
      timeLimit: 40,
      maxMistakes: 2,
    },
    checkered: {
      timeLimit: 35,
    },
  };