import { CoachMemory } from "../hooks/useCoachMemory";

export const unlockRules: Record<string, string[]> = {
  diagonal: ["deductiveOnePerLine"],
  cluster: ["diagonal"],
  mirror: ["cluster"],
  checkered: ["mirror"],
};

export function isStrategyUnlocked(
  strategy: string,
  goalCompletions: Record<string, number[]>
): boolean {
  const required = unlockRules[strategy];
  if (!required) return true; // Ingen spärr

  return required.every(
    (reqStrategy) => (goalCompletions[reqStrategy]?.length || 0) > 0
  );
}

export function getUnlockedStrategies(
  allStrategies: string[],
  goalCompletions: Record<string, number[]>
): string[] {
  return allStrategies.filter((s) => isStrategyUnlocked(s, goalCompletions));
}

export function checkNewStrategyUnlocks(
  previous: string[],
  current: string[]
): string[] {
  return current.filter((strategy) => !previous.includes(strategy));
}