import React from "react";
import Lottie from "lottie-react";
import zenAnimation from "../../../assets/animations/zen-avatar-bonsai.json";

type CoachZenWithBonsaiProps = {
  size?: number;
  mood?: string;
};

const getSymbol = (mood: string = "neutral") => {
  switch (mood) {
    case "praise":
      return "✨"; // Sparkles
    case "tip":
      return "⚡"; // Lightning
    case "error":
      return "⚠"; // Warning
    case "chill":
      return "☁"; // Cloud
    default:
      return "☼"; // Sun/star
  }
};

const CoachZenWithBonsai: React.FC<CoachZenWithBonsaiProps> = ({ size = 120, mood = "neutral" }) => {
  const symbol = getSymbol(mood);

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(163, 228, 215, 0.4) 0%, rgba(26, 46, 43, 0) 70%)",
          zIndex: 0,
        }}
      />

      {/* Bonsai SVG in background */}
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.4,
          zIndex: 1,
        }}
      >
        {/* Fog effect (soft ellipse) */}
        <ellipse cx="50" cy="75" rx="40" ry="10" fill="rgba(200, 200, 200, 0.2)" />
        <ellipse cx="55" cy="78" rx="35" ry="8" fill="rgba(180, 180, 180, 0.15)" />

        {/* Rocks */}
        <circle cx="35" cy="85" r="3" fill="#555" />
        <circle cx="65" cy="87" r="2.5" fill="#666" />

        {/* Bonsai */}
        <circle cx="50" cy="30" r="20" fill="#228B22" />
        <rect x="45" y="50" width="10" height="25" fill="#8B4513" />

        {/* Mood symbol */}
        <text x="50" y="20" fontSize="10" textAnchor="middle" fill="#ffffffaa">{symbol}</text>
      </svg>

      {/* Zen animation in front */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
        }}
      >
        <Lottie animationData={zenAnimation} loop={true} style={{ width: size, height: size }} />
      </div>
    </div>
  );
};

export default CoachZenWithBonsai;
