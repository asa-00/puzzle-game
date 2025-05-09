import React, { useState, useEffect, useCallback } from "react";
import Lottie from "lottie-react";

// Define strict types for animation data
type AnimationData = {
  v: string;
  meta: {
    g: string;
    a: string;
    k: string;
    d: string;
    tc: string;
  };
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  nm: string;
  ddd: number;
  assets: Array<{
    id: string;
    layers: unknown[];
  }>;
  layers: unknown[];
};

// Define component props with strict types
interface CoachZenWithBonsaiProps {
  size?: number;
  mood?: string;
}

const CoachZenWithBonsai: React.FC<CoachZenWithBonsaiProps> = ({
  size = 120,
  mood = "neutral"
}) => {
  // State management for animation data and errors
  const [animationData, setAnimationData] = useState<AnimationData | null>();
  const [error, setError] = useState<string | null>(null);

  // Memoized symbol getter function
  const getSymbol = useCallback((mood: string = "neutral"): string => {
    switch (mood.toLowerCase()) {
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
  }, []);

  // Load animation data safely
  useEffect(() => {
    const loadAnimationData = async () => {
      try {
        const response = await fetch("../../../assets/animations/zen-avatar-bonsai.json");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        if (!data.v || !data.meta) {
          throw new Error("Invalid animation data structure");
        }
        setAnimationData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load animation");
        console.error("Animation loading failed:", err);
      }
    };

    loadAnimationData();
  }, []);

  const generateOptions = useCallback((): Record<string, unknown> => ({
    animationData,
    loop: true,
    autoplay: true,
  }), [animationData]);

  if (error) {
    return (
      <div style={{ textAlign: 'center', color: '#ff4444', fontSize: '16px' }}>
        Error loading zen avatar: {error}
      </div>
    );
  }

  if (!animationData) {
    return (
      <div style={{ textAlign: 'center', color: '#666', fontSize: '16px' }}>
        Loading zen avatar...
      </div>
    );
  }

  const symbol = getSymbol(mood);

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      role="img"
      aria-label={`Zen coach avatar with ${symbol} mood`}
    >
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
        role="presentation"
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
        <text x="50" y="20" fontSize="10" textAnchor="middle" fill="#ffffffaa">
          {symbol}
        </text>
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
        <Lottie animationData={undefined} {...generateOptions()} style={{ width: size, height: size }} />
      </div>
    </div>
  );
};

export default CoachZenWithBonsai;