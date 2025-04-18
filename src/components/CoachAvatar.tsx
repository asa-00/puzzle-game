import React, { JSX } from "react";
import { CoachStyle, Mood } from "../types/coach";

import CoachZen from "./avatars/CoachZen";
import CoachHype from "./avatars/CoachHype";
import CoachWise from "./avatars/CoachWise";
import CoachChill from "./avatars/CoachChill";

interface CoachAvatarProps {
  style: CoachStyle;
  mood?: Mood;
}

const CoachAvatar: React.FC<CoachAvatarProps> = ({ style, mood }) => {
  const coachMap: Record<CoachStyle, JSX.Element> = {
    zen: <CoachZen />,
    hype: <CoachHype />,
    wise: <CoachWise />,
    chill: <CoachChill />,
  };

  return (
    <div className={`coach-avatar mood-${mood} style-${style}`}>
      <div className="coach-glow" />
      <div className="svg-wrapper">{coachMap[style]}</div>
      <div className="name">{style}</div>
    </div>
  );
};

export default CoachAvatar;
