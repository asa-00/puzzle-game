import { motion } from "framer-motion";

interface GameOverProps {
  score: number;
  onRestart: () => void;
  onSave: () => void;
  onBackToStart: () => void;
  leaderboard: { name: string; score: number }[];
  scoreSaved: boolean;
}

const GameOverScreen = ({
  score,
  onRestart,
  onSave,
  onBackToStart,
  leaderboard,
  scoreSaved,
}: GameOverProps) => (
  <motion.div
    className="game-over-screen"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h1>💀 Game Over</h1>
    <p>
      Your final score: <strong>{score}</strong>
    </p>

    <div className="button-group">
      {!scoreSaved && <button onClick={onSave}>💾 Save Score</button>}
      <button onClick={onRestart}>🔁 Play Again</button>
      <button onClick={onBackToStart}>🏠 Back to Start</button>
    </div>

    <div className="leaderboard">
      <h2>🏆 Leaderboard</h2>
      <ul>
        {leaderboard.map((entry, i) => (
          <li key={i}>
            <strong>{entry.name}</strong>: {entry.score}
          </li>
        ))}
      </ul>
      {scoreSaved && <p className="saved-msg">✅ Score saved successfully!</p>}
    </div>
  </motion.div>
);

export default GameOverScreen;
