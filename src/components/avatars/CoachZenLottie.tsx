// src/components/CoachAvatar/CoachZenLottie.tsx
import React from "react";
import Lottie from "lottie-react";
import animationData from "../../../assets/animations/zen-avatar-bonsai.json"; 
type Props = {
  size?: number;
  loop?: boolean;
  className?: string;
};

const CoachZenLottie: React.FC<Props> = ({ size = 100, loop = true, className = "" }) => {
  return (
    <div style={{ width: size, height: size }} className={className}>
      <Lottie animationData={animationData} loop={loop} style={{flex: 1}} autoPlay />
    </div>
  );
};

export default CoachZenLottie;
