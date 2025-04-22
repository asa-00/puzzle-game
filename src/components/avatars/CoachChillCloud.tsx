import React, { useState, useEffect, useCallback } from "react";
import chillAvatar from '../../../assets/images/chill-avatar.gif';

interface CoachChillCloudProps {
  size?: number;
  mood?: string;
}

const CoachChillCloud: React.FC<CoachChillCloudProps> = ({
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
    img.src = chillAvatar;
  }, [chillAvatar]);

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
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Chill Avatar"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      ) : (
        <div style={{ color: '#666' }}>
          Loading chill avatar...
        </div>
      )}
    </div>
    </div>
  );
};

export default CoachChillCloud;