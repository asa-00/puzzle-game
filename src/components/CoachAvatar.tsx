import React, { JSX } from "react";
import { CoachStyle, Mood } from "../types/coach";
import CoachZenLottie from "./avatars/CoachZenLottie";

import CoachZen from "./avatars/CoachZen";
import CoachHype from "./avatars/CoachHype";
import CoachWise from "./avatars/CoachWise";
import CoachChill from "./avatars/CoachChill";
import CoachZenWithBonsai from "./avatars/CoachZenWithBonsai";
import CoachHypeWithFlame from "./avatars/CoachHypeWithFlame";
import CoachChillWithCloud from "./avatars/CoachChillWithCloud";
import CoachWiseWithStars from "./avatars/CoachWiseWithStars";

interface CoachAvatarProps {
  style: CoachStyle;
  mood?: Mood;
}

const CoachAvatar: React.FC<CoachAvatarProps> = ({ style, mood }) => {
  const COACH_COMPONENTS: any = {
    zen: CoachZenLottie,
    // hype: CoachHypeLottie,
    // wise: CoachWiseLottie,
    // chill: CoachChillLottie,
  };

  const CoachComponent: any = COACH_COMPONENTS[style];
  
  const coachMap: Record<CoachStyle, JSX.Element> = {
    zen: <CoachZenWithBonsai size={140} mood={mood} />,
    hype: <CoachHypeWithFlame size={140} mood={mood} />,
    wise: <CoachWiseWithStars size={140} mood={mood} />,
    chill: <CoachChillWithCloud size={140} mood={mood} />,
  };

  return (
    <div className={`coach-avatar mood-${mood} style-${style}`}>
        <>
   {/*        <div className="coach-glow" /> */}
          <div className="svg-wrapper">{coachMap[style]}</div>
          <div className="name">Coach style: {style}</div>
        </>

    </div>
  );
};

export default CoachAvatar;
