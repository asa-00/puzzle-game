import React, { JSX } from "react";
import { CoachStyle, Mood } from "../types/coach";
import CoachHypeFlame from "./avatars/CoachHypeFlame";
import CoachChillCloud from "./avatars/CoachChillCloud";
import CoachWiseStars from "./avatars/CoachWiseStars";
import CoachZenBonzai from "./avatars/CoachZenBonsai";

interface CoachAvatarProps {
  style: CoachStyle;
  mood?: Mood;
}

const CoachAvatar: React.FC<CoachAvatarProps> = ({ style, mood }) => { 
  const coachMap: Record<CoachStyle, JSX.Element> = {
    zen: <CoachZenBonzai size={140} mood={mood} />,
    hype: <CoachHypeFlame size={140} mood={mood} />,
    wise: <CoachWiseStars size={140} mood={mood} />,
    chill: <CoachChillCloud size={140} mood={mood} />,
  };

  return (
    <div className={`coach-avatar mood-${mood} style-${style}`}>
        <>
         {/*  <div className="coach-glow" /> */}
          <div className="svg-wrapper">{coachMap[style]}</div>
          <div className="name">Coach style: {style}</div>
        </>

    </div>
  );
};

export default CoachAvatar;
