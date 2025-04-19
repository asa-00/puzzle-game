import React from "react";
import Lottie from "lottie-react";
import wiseAnimation from "../../../assets/animations/wise-avatar.json";

type CoachWiseWithStarsProps = {
  size?: number;
  mood?: string;
};

const getSymbol = (mood: string = "neutral") => {
  switch (mood) {
    case "praise": return "✩"; // Sparkle Star
    case "tip": return "📖"; // Open Book
    case "error": return "⚠"; // Warning
    case "chill": return "🌌"; // Milky Way
    default: return "☆"; // Star Outline
  }
};

const CoachWiseWithStars: React.FC<CoachWiseWithStarsProps> = ({ size = 120, mood = "neutral" }) => {
  const symbol = getSymbol(mood);

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
      }}
    >
      {/* Celestial glow */}
      <div
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180, 160, 255, 0.3) 0%, rgba(20, 0, 50, 0) 70%)",
          zIndex: 0,
        }}
      />

      {/* Starscape base + mood symbol */}
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
        {/* Star field */}
        <circle cx="20" cy="25" r="1" fill="#fff" />
        <circle cx="80" cy="30" r="1.5" fill="#ccc" />
        <circle cx="50" cy="10" r="1.2" fill="#eee" />

        {/* Mood Symbol */}
        <text x="50" y="20" fontSize="10" textAnchor="middle" fill="#ffffffaa">{symbol}</text>
      </svg>

      {/* Animation on top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
        }}
      >
        <Lottie animationData={wiseAnimation} loop={true} style={{ width: size, height: size }} />
      </div>
    </div>
  );
};

export default CoachWiseWithStars;
