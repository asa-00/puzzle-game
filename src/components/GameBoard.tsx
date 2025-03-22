// src/components/GameBoard.tsx
import React, { useState } from 'react';
import { useGameLogic } from '../hooks/useGameLogic';

const GameBoard: React.FC<{ onEndGame: () => void }> = ({ onEndGame }) => {
  const { gameState, makeGuess } = useGameLogic();
  const [guess, setGuess] = useState<number | ''>('');

  const handleGuess = () => {
    if (typeof guess === 'number') {
      makeGuess(guess);
      setGuess('');
    }
  };

  return (
    <div className="game-board">
      <h2>Guess the Number!</h2>
      <p>Score: {gameState.score}</p>
      <p>Attempts: {gameState.attempts}</p>
      <p>Current Target: {gameState.targetNumber}</p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(Number(e.target.value))}
        placeholder="Enter your guess"
      />
      <button onClick={handleGuess}>Submit Guess</button>
      <button onClick={onEndGame}>End Game</button>
    </div>
  );
};

export default GameBoard;