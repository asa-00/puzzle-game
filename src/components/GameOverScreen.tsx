import React from 'react';

interface GameOverScreenProps {
  onRestart: () => void;
  score: number;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ onRestart, score }) => {
  return (
    <div className="game-over-screen">
      <h1>Game Over</h1>
      <p>Your Score: {score}</p>
      <button onClick={onRestart}>Restart Game</button>
    </div>
  );
};

export default GameOverScreen;
