import { useState, useEffect } from 'react';
import useSound from 'use-sound';
import correctSound from '../../assets/sounds/correct.mp3';
import incorrectSound from '../../assets/sounds/incorrect.mp3';

const initialPuzzle = () => {
  return Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
};

export const useGameLogic = () => {
  const [gameState, setGameState] = useState({
    isGameStarted: false,
    isGameOver: false,
    score: 0,
    attempts: 0,
    targetNumber: initialPuzzle(),
  });

  const [playCorrect] = useSound(correctSound);
  const [playIncorrect] = useSound(incorrectSound);

  const startGame = () => {
    setGameState({
      isGameStarted: true,
      isGameOver: false,
      score: 0,
      attempts: 0,
      targetNumber: initialPuzzle(),
    });
  };

  const endGame = () => {
    setGameState(prev => ({ ...prev, isGameOver: true }));
  };

  const makeGuess = (guess: number) => {
    setGameState(prev => {
      const isCorrect = guess === prev.targetNumber;
      const newScore = isCorrect ? prev.score + 10 : prev.score;
      const newAttempts = prev.attempts + 1;

      if (isCorrect) {
        playCorrect();
        return {
          ...prev,
          score: newScore,
          targetNumber: initialPuzzle(), // Generate a new puzzle
          attempts: newAttempts,
        };
      } else {
        playIncorrect();
        return {
          ...prev,
          attempts: newAttempts,
        };
      }
    });
  };

  useEffect(() => {
    if (gameState.attempts > 0 && gameState.attempts % 5 === 0) {
      setGameState(prev => ({
        ...prev,
        targetNumber: Math.floor(Math.random() * (100 + gameState.attempts)) + 1, // Increase range
      }));
    }
  }, [gameState.attempts]);

  return { gameState, startGame, endGame, makeGuess };
};
