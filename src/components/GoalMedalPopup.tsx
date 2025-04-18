import { motion } from "framer-motion";
import React, { useEffect } from "react";

interface GoalMedalPopupProps {
  onClose: () => void;
}

const GoalMedalPopup: React.FC<GoalMedalPopupProps> = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      className="goal-medal-popup"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <button className="close-btn" onClick={onClose}>✖</button>
      <div className="medal">🏅</div>
      <p className="goal-text">🎯 Smart Goal Achieved!</p>
    </motion.div>
  );
};

export default GoalMedalPopup;