import React, { useState, useEffect, useCallback } from "react";
import hypeAvatar from '../../../assets/images/hype-avatar.gif';

interface CoachHypeFlameProps {
  size?: number;
  mood?: string;
}

const CoachHypeFlame: React.FC<CoachHypeFlameProps> = ({
  size = 120,
  mood = "neutral"
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getSymbol = useCallback((mood: string = "neutral"): string => {
    switch (mood.toLowerCase()) {
      case "praise":
        return "✨";
      case "tip":
        return "⚡"; 
      case "error":
        return "⚠"; 
      case "chill":
        return "☁"; 
      default:
        return "☼"; 
    }
  }, []);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageSrc(img.src);
    img.onerror = () => setError('Failed to load image');
    img.src = hypeAvatar;
  }, [hypeAvatar]);

  if (error) {
    return (
      <div style={{ color: '#ff4444' }}>
        Error loading chill avatar: {error}
      </div>
    );
  }
  
  const symbol = getSymbol(mood);
  return (
    <div style={{ width: size, height: size }}>
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
      aria-label={`hype coach avatar with ${symbol} mood`}
    >
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
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="hype Avatar"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      ) : (
        <div style={{ color: '#666' }}>
          Loading hype avatar...
        </div>
      )}
    </div>
    </div>
  );
};

export default CoachHypeFlame;