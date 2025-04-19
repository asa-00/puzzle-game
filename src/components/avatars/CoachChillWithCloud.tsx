import React from "react";
import Lottie from "lottie-react";
import chillAnimation from "../../../assets/animations/chill-avatar.json";

type CoachChillWithCloudProps = {
  size?: number;
  mood?: string;
};

const getSymbol = (mood: string = "neutral") => {
  switch (mood) {
    case "praise": return "✨"; // Sparkle
    case "tip": return "💡"; // Lightbulb
    case "error": return "⚠"; // Warning
    case "chill": return "❄"; // Snowflake
    default: return "☁"; // Cloud
  }
};

const CoachChillWithCloud: React.FC<CoachChillWithCloudProps> = ({ size = 120, mood = "neutral" }) => {
  const symbol = getSymbol(mood);

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
      }}
    >
      {/* Soft blue glow */}
      <div
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(100, 180, 255, 0.3) 0%, rgba(0, 0, 30, 0) 70%)",
          zIndex: 0,
        }}
      />

      {/* Cloudy base + symbol */}
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
        {/* Ground mist */}
        <ellipse cx="50" cy="78" rx="40" ry="9" fill="rgba(160, 200, 255, 0.2)" />
        <ellipse cx="52" cy="82" rx="35" ry="8" fill="rgba(140, 180, 240, 0.2)" />

        {/* Symbol */}
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
        <Lottie animationData={chillAnimation} loop={true} style={{ width: size, height: size }} />
      </div>
    </div>
  );
};

export default CoachChillWithCloud;
