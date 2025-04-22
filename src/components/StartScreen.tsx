import React, { useState } from "react";
import usePersistentState from "../hooks/usePersistentState";
import { CoachStyle } from "../types/coach";
import backgroundUrl from '../../assets/images/zen-start-background.jpg';

interface StartScreenProps {
  onStart: () => void;
  setCoachStyle: (style: "zen" | "hype" | "wise" | "chill") => void;
}

const coachOptions: {
  value: "zen" | "hype" | "wise" | "chill";
  label: string;
  emoji: string;
  description: string;
  voiceLine: string;
}[] = [
  {
    value: "zen",
    emoji: "🧘",
    label: "Zen",
    description: "Calm and focused guidance",
    voiceLine: "Let us begin with balance and peace.",
  },
  {
    value: "hype",
    emoji: "🔥",
    label: "Hype",
    description: "High energy encouragement",
    voiceLine: "Yoooo! Let's smash this puzzle together!",
  },
  {
    value: "wise",
    emoji: "🦉",
    label: "Wise",
    description: "Strategic and insightful",
    voiceLine: "Wisdom lies in each careful move.",
  },
  {
    value: "chill",
    emoji: "😎",
    label: "Chill",
    description: "Relaxed and supportive",
    voiceLine: "No stress. Just vibes and victory.",
  },
];

const StartScreen: React.FC<StartScreenProps> = ({ onStart, setCoachStyle }) => {
  const [selectedStyle, setSelectedStyle] = usePersistentState<CoachStyle>("coachStyle", "zen");

  const speakPreview = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  const handleStyleSelect = (value: "zen" | "hype" | "wise" | "chill") => {
    setSelectedStyle(value);
    const selected = coachOptions.find((opt) => opt.value === value);
    if (selected) speakPreview(selected.voiceLine);
  };

  const handleStart = () => {
    setCoachStyle(selectedStyle);
    onStart();
  };

  return (
    <div className="start-screen" style={{ backgroundImage: `url(${backgroundUrl})` }}>
      <h1>🌌<span className="glow">FractaZen</span></h1>
      <p>Select your coach style:</p>

      <div className="coach-options">
        {coachOptions.map((option) => (
          <div
            key={option.value}
            className={`coach-card ${selectedStyle === option.value ? "selected" : ""}`}
            onClick={() => handleStyleSelect(option.value)}
          >
            <span className="emoji">{option.emoji}</span>
            <h3>{option.label}</h3>
            <p>{option.description}</p>
          </div>
        ))}
      </div>

      <button className="start-btn" onClick={handleStart}>
        🚀 Start Game
      </button>
    </div>
  );
};

export default StartScreen;
