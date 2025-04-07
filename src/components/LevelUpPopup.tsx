import { motion } from "framer-motion";
import { useEffect } from "react";

interface LevelUpPopupProps {
  level: number;
  unlocks: string[];
  reward: string;
  onClose: () => void;
}

const featureDescriptions: Record<string, string> = {
  hint: "You can now use hints to guide your strategy!",
  fastHints: "Hints will now show up faster after inactivity.",
  advancedCoach: "Your coach now provides smarter, more adaptive feedback.",
  tileAnimations: "Enjoy smoother tile animations.",
  voiceCoach: "Your coach will now talk to you with voice guidance!",
  autoHint: "Hints will appear automatically when you’re stuck.",
  coachInsights: "Track your playstyle and performance with Coach Insights.",
  dailyFeedback: "Receive daily motivational messages from your coach.",
  challengeMode: "Face unique level-based challenges to push your limits.",
};

const LevelUpPopup: React.FC<LevelUpPopupProps> = ({ level, unlocks, reward, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 6000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      className="level-up-popup"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="popup-content">
        <h2>🎉 Level {level} Reached!</h2>
        <p className="reward">🏅 {reward}</p>
        {unlocks.length > 0 && (
          <>
            <p>New Features Unlocked:</p>
            <ul>
              {unlocks.map((f, idx) => (
                <li key={idx}>🔓 {featureDescriptions[f] || f}</li>
              ))}
            </ul>
          </>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </motion.div>
  );
};

export default LevelUpPopup;
