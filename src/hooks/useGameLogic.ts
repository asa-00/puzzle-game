import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import { levels } from "../config/progression";
import { useCoachMemory } from "./useCoachMemory";
import { challengeConditions } from "../config/challenges";

const baseGridSize = 5;
const maxConsecutiveMistakes = 5;
const levelTimerSeconds = 60;
const maxFocus = 100;
const rowMutationDelay = 30000;

function generateLogicalPattern(size: number) {
  const pattern: number[] = Array(size * size).fill(0);
  const rowHints: number[][] = [];
  const colHints: number[][] = Array(size).fill(null).map(() => []);

  for (let row = 0; row < size; row++) {
    const activeIndices = new Set<number>();
    while (activeIndices.size < 3) {
      activeIndices.add(Math.floor(Math.random() * size));
    }
    const hintRow: number[] = [];

    for (let col = 0; col < size; col++) {
      const index = row * size + col;
      if (activeIndices.has(col)) {
        pattern[index] = 1;
        hintRow.push(col);
        colHints[col].push(row);
      }
    }
    rowHints.push(hintRow);
  }

  return { pattern, rowHints, colHints };
}

export function useGameLogic() {
  const [gridSize, setGridSize] = useState(baseGridSize);
  const [grid, setGrid] = useState(generateGrid(baseGridSize));
  const [pattern, setPattern] = useState<number[]>([]);
  const [rowHints, setRowHints] = useState<number[][]>([]);
  const [colHints, setColHints] = useState<number[][]>([]);
  const [rowStatuses, setRowStatuses] = useState<boolean[]>([]);
  const [colStatuses, setColStatuses] = useState<boolean[]>([]);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [leaderboard, setLeaderboard] = useState<{ name: string; score: number }[]>([]);
  const [hintAvailable, setHintAvailable] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [unlockedFeatures, setUnlockedFeatures] = useState<string[]>([]);
  const [justLeveledUp, setJustLeveledUp] = useState(false);
  const [newUnlocks, setNewUnlocks] = useState<string[]>([]);
  const [levelUpInfo, setLevelUpInfo] = useState<{ level: number; unlocks: string[], reward: string } | null>(null);
  const { memory, setChallenge, resetMemory } = useCoachMemory();
  const [scoreSaved, setScoreSaved] = useState(false);

  const [focus, setFocus] = useState(maxFocus);
  const [consecutiveMistakes, setConsecutiveMistakes] = useState(0);
  const [levelTimer, setLevelTimer] = useState(levelTimerSeconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  function generateGrid(size: number) {
    return Array.from({ length: size * size }, (_, i) => ({ id: i, active: false }));
  }

  const updateStatuses = (pattern: number[], grid: { id: number; active: boolean }[], size: number) => {
    const rowStatus = Array(size).fill(false);
    const colStatus = Array(size).fill(false);

    for (let i = 0; i < size; i++) {
      const rowCorrect = Array.from({ length: size }, (_, j) => i * size + j).every(
        index => pattern[index] === (grid[index].active ? 1 : 0)
      );
      rowStatus[i] = rowCorrect;

      const colCorrect = Array.from({ length: size }, (_, j) => j * size + i).every(
        index => pattern[index] === (grid[index].active ? 1 : 0)
      );
      colStatus[i] = colCorrect;
    }

    setRowStatuses(rowStatus);
    setColStatuses(colStatus);
  };

  const mutateRandomRow = () => {
    const rowToMutate = Math.floor(Math.random() * gridSize);
    const newPattern = [...pattern];
    const newRow: number[] = [];
    const activeIndices = new Set<number>();
    while (activeIndices.size < 3) {
      activeIndices.add(Math.floor(Math.random() * gridSize));
    }
    for (let col = 0; col < gridSize; col++) {
      const index = rowToMutate * gridSize + col;
      newPattern[index] = activeIndices.has(col) ? 1 : 0;
      if (activeIndices.has(col)) newRow.push(col);
    }
    const newRowHints = [...rowHints];
    newRowHints[rowToMutate] = newRow;
    setPattern(newPattern);
    setRowHints(newRowHints);
    updateStatuses(newPattern, grid, gridSize);
  };

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (!gameOver && gameStarted) mutateRandomRow();
    }, rowMutationDelay);
  };

  const handleClick = (index: number) => {
    resetInactivityTimer();
    const correct = pattern[index] === (grid[index].active ? 0 : 1);

    setGrid(prev => {
      const updated = prev.map((cell, i) => i === index ? { ...cell, active: !cell.active } : cell);
      updateStatuses(pattern, updated, gridSize);
      return updated;
    });

    if (correct) {
      setConsecutiveMistakes(0);
      setFocus(prev => Math.min(maxFocus, prev + 5));
    } else {
      setConsecutiveMistakes(prev => {
        const mistakes = prev + 1;
        if (mistakes >= maxConsecutiveMistakes) triggerGameOver();
        return mistakes;
      });
      setFocus(prev => Math.max(0, prev - 10));
    }

    if (focus <= 0) {
      triggerGameOver();
    }

    setShowHint(false);
  };

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setLevelTimer(levelTimerSeconds);
    timerRef.current = setInterval(() => {
      setLevelTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          triggerGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    resetInactivityTimer();
    return () => {
      clearInterval(timerRef.current!);
      clearTimeout(inactivityTimerRef.current!);
    };
  }, [currentLevel, gameStarted, gameOver]);

  function getCoachFeedback(): string {
    const total = grid.length;
    const correct = grid.filter((cell, i) => (cell.active ? 1 : 0) === pattern[i]).length;
    const matchRatio = correct / total;

    if (matchRatio === 1) return "Perfect! You nailed it!";
    if (matchRatio >= 0.75) return "So close! Just a few adjustments!";
    if (matchRatio >= 0.5) return "You're halfway there – keep going!";
    if (matchRatio >= 0.25) return "Not bad! Try flipping more edge pieces.";
    return "Focus and breathe. Let the pattern reveal itself 🧘‍♂️";
  }

  useEffect(() => {
    if (checkPattern()) {
      const nextScore = score + difficulty * 10;
      setScore(nextScore);
      setDifficulty(prev => prev + 1);

      const nextLevel = currentLevel + 1;
      setCurrentLevel(nextLevel);

      const levelData = levels.find((lvl) => lvl.level === nextLevel);

      if (levelData?.challenge) {
        const conditionFn = challengeConditions[levelData.challenge.condition];
        if (conditionFn) {
          setChallenge(levelData.challenge.description, () => conditionFn(memory));
        }
      }

      if (levelData) {
        const newFeatures = [...unlockedFeatures, ...levelData.unlocks];
        const deduplicated = Array.from(new Set(newFeatures));
        setUnlockedFeatures(deduplicated);
        setNewUnlocks(levelData.unlocks);
        setJustLeveledUp(true);
        setLevelUpInfo({ level: nextLevel, unlocks: levelData.unlocks, reward: levelData.reward });
      }

      const newSize = baseGridSize + Math.floor(difficulty / 2);
      setGridSize(newSize);
      startNewLevel(newSize);
    }
  }, [grid]);

  const startNewLevel = (size: number) => {
    const { pattern, rowHints, colHints } = generateLogicalPattern(size);
    setPattern(pattern);
    setRowHints(rowHints);
    setColHints(colHints);
    const newGrid = generateGrid(size);
    setGrid(newGrid);
    setHintAvailable(false);
    setShowHint(false);
    updateStatuses(pattern, newGrid, size);
  };

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const timer = setTimeout(() => setHintAvailable(true), 30000);
    return () => clearTimeout(timer);
  }, [grid, gameStarted, gameOver]);

  const getHint = () => pattern.map((value, index) => value === 1 ? index : null).filter(v => v !== null) as number[];
  const useHint = () => { if (hintAvailable && unlockedFeatures.includes("hint")) setShowHint(true); };
  const checkPattern = () => grid.every((cell, i) => (cell.active ? 1 : 0) === pattern[i]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setDifficulty(1);
    setGridSize(baseGridSize);
    setCurrentLevel(1);
    setUnlockedFeatures([]);
    setJustLeveledUp(false);
    setNewUnlocks([]);
    setLevelUpInfo(null);
    setFocus(maxFocus);
    setConsecutiveMistakes(0);
    const { pattern, rowHints, colHints } = generateLogicalPattern(baseGridSize);
    setPattern(pattern);
    setRowHints(rowHints);
    setColHints(colHints);
    const newGrid = generateGrid(baseGridSize);
    setGrid(newGrid);
    setHintAvailable(false);
    setShowHint(false);
    updateStatuses(pattern, newGrid, baseGridSize);
  };

  const triggerGameOver = () => {
    setGameOver(true);
    setGameStarted(false);
  };

  const saveScore = async () => {
    const playerName = prompt("Enter your name:");
    if (playerName) {
      await supabase.from("leaderboard").insert([{ name: playerName, score }]);
      setScoreSaved(true);
      fetchLeaderboard();
    }
  };

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase.from("leaderboard").select("*").order("score", { ascending: false }).limit(10);
    if (error) console.error("Failed to fetch leaderboard:", error);
    else if (data) setLeaderboard(data);
  };

  useEffect(() => { fetchLeaderboard(); }, []);

  const clearLevelUpInfo = () => {
    setJustLeveledUp(false);
    setLevelUpInfo(null);
  };

  const resetGame = () => { 
    setScore(0);
    setDifficulty(1);
    setFocus(maxFocus);
    setConsecutiveMistakes(0);
    setCurrentLevel(1);
    setUnlockedFeatures([]);
    setJustLeveledUp(false);
    setNewUnlocks([]);
    setLevelUpInfo(null);
    setScoreSaved(false);
    resetMemory();
    setGameStarted(false);
    setGameOver(false);
    setHintAvailable(false);
    setShowHint(false);
    setGridSize(baseGridSize);
    const { pattern, rowHints, colHints } = generateLogicalPattern(baseGridSize);
    setPattern(pattern);
    setRowHints(rowHints);
    setColHints(colHints);
    const newGrid = generateGrid(baseGridSize);
    setGrid(newGrid);
    updateStatuses(pattern, newGrid, baseGridSize);
  };

  return {
    grid,
    gridSize,
    score,
    difficulty,
    gameStarted,
    gameOver,
    leaderboard,
    handleClick,
    startGame,
    saveScore,
    hintAvailable,
    showHint,
    useHint,
    getHint,
    setHintAvailable,
    getCoachFeedback,
    pattern,
    triggerGameOver,
    currentLevel,
    unlockedFeatures,
    justLeveledUp,
    setJustLeveledUp,
    newUnlocks,
    levelUpInfo,
    clearLevelUpInfo,
    rowHints,
    colHints,
    rowStatuses,
    colStatuses,
    consecutiveMistakes,
    focus,
    levelTimer,
    scoreSaved,
    resetGame
  };
}
