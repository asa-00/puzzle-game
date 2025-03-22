import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="start-screen">
      <h1>Welcome to FractaZen!</h1>
      <button onClick={onStart}>Start Game</button>
      <p>Instructions: Solve the puzzles to earn points!</p>
    </div>
  );
};

export default StartScreen;
