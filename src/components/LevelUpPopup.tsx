import { motion } from "framer-motion";
import { useEffect } from "react";
import { speak } from "../utils/voiceCoach";
import { CoachStyle } from "../types/coach";

interface LevelUpPopupProps {
  level: number;
  unlocks: string[];
  reward: string;
  timeBonus?: number;
  mistakeBonus?: number;
  coachStyle: CoachStyle;
  voiceEnabled: boolean;
  onClose: () => void;
}

const timeBonusLines = {
  zen: "You moved like the wind.",
  hype: "Speed run king! 💨",
  wise: "Time was on your side. Impressive.",
  chill: "Fast and smooth. I like it.",
};

const misstakeBonusLines = {
  zen: "Almost no flaws. True focus.",
  hype: "Barely any mistakes?! You're a machine!",
  wise: "Precision and control – you’re learning well.",
  chill: "Clean and chill. Respect.",
};

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
  mirrorX: "The board can now flip horizontally.",
  mirrorY: "The board can now flip vertically.",
  rotate90: "The board can now rotate 90 degrees.",
  shuffleRows: "Rows can now be shuffled for more challenge.",
  diagonal: "You’ve unlocked diagonal logic patterns!",
  cluster: "Cluster-based deduction is now available.",
  mirror: "Mirror-based puzzles unlocked!",
  checkered: "You can now face checkered logic challenges.",
};

const LevelUpPopup: React.FC<LevelUpPopupProps> = ({
  level,
  unlocks,
  reward,
  timeBonus = 0,
  mistakeBonus = 0,
  coachStyle,
  voiceEnabled,
  onClose,
}) => {
  useEffect(() => {
    const lines: string[] = [];

    if (timeBonus > 0) {
      lines.push(timeBonusLines[coachStyle]);
    }

    if (mistakeBonus > 0) {
      lines.push(misstakeBonusLines[coachStyle]);
    }

    if (voiceEnabled && lines.length > 0) {
      speak(lines.join(" "), coachStyle);
    }

    const timer = setTimeout(() => onClose(), 6000);
    return () => clearTimeout(timer);
  }, []);

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

        {(timeBonus > 0 || mistakeBonus > 0) && (
          <div className="bonus-summary">
            <p>🔥 Bonus Points:</p>
            <ul>
              {timeBonus > 0 && <li>⚡ Speed: +{timeBonus}</li>}
              {mistakeBonus > 0 && <li>🎯 Precision: +{mistakeBonus}</li>}
            </ul>
          </div>
        )}

        {unlocks.length > 0 && (
          <>
            <p>🆕 New Features Unlocked:</p>
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
