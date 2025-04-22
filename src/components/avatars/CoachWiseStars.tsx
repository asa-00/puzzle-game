import React, { useState, useEffect, useCallback } from "react";
import wiseAvatar from '../../../assets/images/wise-avatar.gif';

interface CoachZenWithBonsaiProps {
  size?: number;
  mood?: string;
}

const CoachZenWithBonsai: React.FC<CoachZenWithBonsaiProps> = ({
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
    img.src = wiseAvatar;
  }, [wiseAvatar]);

  if (error) {
    return (
      <div style={{ color: '#ff4444' }}>
        Error loading zen avatar: {error}
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
      aria-label={`Zen coach avatar with ${symbol} mood`}
    >
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
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Zen Avatar"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      ) : (
        <div style={{ color: '#666' }}>
          Loading zen avatar...
        </div>
      )}
    </div>
    </div>
  );
};

export default CoachZenWithBonsai;