// src/App.tsx
import React from 'react';
import StartScreen from './components/StartScreen';
import GameBoard from './components/GameBoard';
import Leaderboard from './components/Leaderboard';
import { useGameLogic } from './hooks/useGameLogic';
import GameOverScreen from './components/GameOverScreen';
import './App.scss';

const App: React.FC = () => {
  const { gameState, startGame, endGame } = useGameLogic();

  return (
    <div className="app">
      {gameState.isGameOver ? (
        <GameOverScreen onRestart={startGame} score={gameState.score} />
      ) : gameState.isGameStarted ? (
        <GameBoard onEndGame={endGame} />
      ) : (
        <StartScreen onStart={startGame} />
      )}
      <Leaderboard />
    </div>
  );
};

export default App;