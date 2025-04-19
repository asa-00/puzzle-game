// CoachPanel.tsx
import { motion } from "framer-motion";
import React from "react";
import { CoachStyle } from "../types/coach";
import { useCoachMemory } from "../hooks/useCoachMemory";
import { useVoiceCoach } from "../hooks/useVoiceCoach";
import CoachAvatar from "./CoachAvatar";
import { Mood } from "../types/coach";

export const challengeIntro = {
  zen: "Let's try this, mindfully 🧘‍♂️:",
  hype: "🔥 Challenge time, let’s GO:",
  wise: "Here’s your task for growth:",
  chill: "Eh, if you're up for it 😎:",
};

interface CoachPanelProps {
  feedback: string;
  playerType: string;
  personality: CoachStyle;
  mood: Mood;
  voiceEnabled: boolean;
  streak: number;
  style: string;
  tip: string | undefined;
  isImproving: boolean;
  challengeCompleted?: boolean;
  unlockedFeatures: string[];
  lowFocus?: boolean;
}

export const coachStyles: Record<
  CoachStyle,
  {
    tone: string;
    style: string;
    emoji: string;
    color: string;
    animation: string;
  }
> = {
  zen: {
    tone: "calm and reflective",
    style: "minimal",
    emoji: "🧘‍♂️",
    color: "#88ccff",
    animation: "floatZen",
  },
  hype: {
    tone: "excited and loud",
    style: "bold",
    emoji: "🔥",
    color: "#ff4081",
    animation: "bounceHype",
  },
  wise: {
    tone: "thoughtful and experienced",
    style: "classic",
    emoji: "🥍",
    color: "#b49aff",
    animation: "fadeWise",
  },
  chill: {
    tone: "laid-back and supportive",
    style: "soft",
    emoji: "😎",
    color: "#a0e7e5",
    animation: "slideChill",
  },
};

const CoachPanel: React.FC<CoachPanelProps> = ({
  feedback,
  playerType,
  personality,
  mood,
  voiceEnabled,
  streak,
  style,
  tip,
  isImproving,
  challengeCompleted,
  unlockedFeatures,
  lowFocus
}) => {
  const coach = coachStyles[personality];
  const shouldAnimate = mood === "praise" || mood === "boost";
  const moodClass = `mood-${mood}`;
  const { getChallengeStatus } = useCoachMemory();
  const { triggerVoice } = useVoiceCoach(personality, voiceEnabled);
  const challenge = getChallengeStatus();

  if (getChallengeStatus()?.completed) {
    triggerVoice("streak");
  }

  return (
    <div className={`coach-panel ${moodClass}`}>
      <motion.div
        animate={shouldAnimate || challengeCompleted ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1.5, repeat: shouldAnimate ? Infinity : 0 }}
      >
        {voiceEnabled && <p className="coach-voice">🗣️ Voice enabled</p>}
        <CoachAvatar
          style={personality}
          mood={mood}
      />
      </motion.div>
{/*       <motion.div
        className={`coach-avatar ${coach.animation} ${
          isImproving ? "improving-glow" : ""} 
          ${challengeCompleted ? "challenge-celebrate" : ""}
          ${mood === "praise" && unlockedFeatures.includes("advancedCoach") ? "pulse" : ""}
          ${lowFocus ? "pulse-alert" : ""}
          `}
        animate={
          shouldAnimate || challengeCompleted ? { scale: [1, 1.1, 1] } : {}
        }
        transition={{ duration: 1.5, repeat: shouldAnimate ? Infinity : 0 }}
        style={{ color: coach.color }}
      >
        <span className="emoji" role="img" aria-label="Coach">
          {coach.emoji}
        </span>
      </motion.div> */}
      {challengeCompleted && (
        <motion.div
          className="challenge-popup"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          🎯 Challenge Complete!
        </motion.div>
      )}
{/*       <motion.div
        key={feedback} 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="coach-feedback"
        style={{ color: coach.color }}
      >
        <strong>Coach style: {capitalize(coach.style)}</strong><br />{feedback}
      </motion.div> */}
      {tip && <div className="coach-tip">💡 {tip}</div>}
      {challenge && (
        <div
          className={`coach-challenge ${
            challenge.completed ? "completed" : ""
          }`}
        >
          {challengeIntro[personality]} <br />
          <strong>{challenge.description}</strong>
          {challenge.completed && <span className="status"> ✅ Done!</span>}
        </div>
      )}
      {isImproving && (
        <motion.div
          key="emoji-burst"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="emoji-burst"
        >
          🌟
        </motion.div>
      )}
      {challengeCompleted && (
        <motion.div
          className="challenge-popup"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          🎯 <span>Challenge Complete!</span> 🎉
        </motion.div>
      )}
    </div>
  );
};

export default CoachPanel;
