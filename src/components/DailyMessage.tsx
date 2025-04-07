import React from "react";
import { CoachStyle } from "../types/coach";

interface DailyMessageProps {
  message: string;
  style: CoachStyle;
}

const styleColors: Record<CoachStyle, string> = {
  zen: "#88ccff",
  hype: "#ff4081",
  wise: "#b49aff",
  chill: "#a0e7e5",
};

const DailyMessage: React.FC<DailyMessageProps> = ({ message, style }) => {
  return (
    <div className="daily-message" style={{ borderColor: styleColors[style] }}>
      <span>{message}</span>
    </div>
  );
};

export default DailyMessage;
