import React from "react";
import Lottie from "lottie-react";
import hypeAnimation from "../../../assets/animations/hype-avatar.json";

type CoachHypeWithFlameProps = {
  size?: number;
  mood?: string;
};

const getSymbol = (mood: string = "neutral") => {
  switch (mood) {
    case "praise": return "🔥"; // Fire
    case "tip": return "💡"; // Lightbulb
    case "error": return "⚠"; // Warning
    case "chill": return "🌧"; // Rain cloud
    default: return "✨"; // Sparkle
  }
};

const CoachHypeWithFlame: React.FC<CoachHypeWithFlameProps> = ({ size = 120, mood = "neutral" }) => {
  const symbol = getSymbol(mood);

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
      }}
    >
      {/* Background pulse glow */}
      <div
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 85, 0, 0.3) 0%, rgba(20, 0, 0, 0) 70%)",
          zIndex: 0,
        }}
      />

      {/* Flame & symbol background */}
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.45,
          zIndex: 1,
        }}
      >
        {/* Lava base */}
        <ellipse cx="50" cy="80" rx="40" ry="10" fill="rgba(255, 100, 0, 0.2)" />
        <circle cx="40" cy="85" r="3" fill="#883" />
        <circle cx="60" cy="87" r="2.5" fill="#aa5" />

        {/* Symbol */}
        <text x="50" y="20" fontSize="10" textAnchor="middle" fill="#ffffffaa">{symbol}</text>
      </svg>

      {/* Animation in front */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
        }}
      >
        <Lottie animationData={hypeAnimation} loop={true} style={{ width: size, height: size }} />
      </div>
    </div>
  );
};

export default CoachHypeWithFlame;
