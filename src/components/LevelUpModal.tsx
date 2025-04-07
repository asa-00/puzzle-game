import React from "react";
import { motion } from "framer-motion";

interface LevelUpModalProps {
  level: number;
  newUnlocks: string[];
  onClose: () => void;
}

const LevelUpModal: React.FC<LevelUpModalProps> = ({ level, newUnlocks, onClose }) => {
  return (
    <motion.div
      className="levelup-modal"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4 }}
    >
      <h2>🎉 Level Up! You reached Level {level}</h2>
      <ul>
        {newUnlocks.map((feature, index) => (
          <li key={index}>🔓 {feature}</li>
        ))}
      </ul>
      <button onClick={onClose}>Continue</button>
    </motion.div>
  );
};

export default LevelUpModal;