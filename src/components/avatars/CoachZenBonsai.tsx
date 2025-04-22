import React, { useState, useEffect, useCallback } from "react";
import zenAvatar from '../../../assets/images/zen-avatar-bonsai.gif';

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
    img.src = zenAvatar;
  }, [zenAvatar]);

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