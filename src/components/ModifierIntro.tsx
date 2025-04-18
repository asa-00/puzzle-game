import React, { useEffect } from "react";
import { speak } from "../utils/voiceCoach";
import { CoachStyle } from "../types/coach";
import useSound from "use-sound";
import unlockSound from "../../assets/sounds/unlock.mp3";

interface ModifierIntroProps {
  modifier: string;
  coachStyle: CoachStyle;
  voiceEnabled: boolean;
  onClose: () => void;
}

const modifierDescriptions: Record<string, string> = {
  mirrorX: "This modifier flips the board horizontally. Get ready to think in reflections!",
  mirrorY: "This one flips things vertically. Time to flip your perspective!",
  rotate90: "The board is rotated 90°. Orient yourself before you play!",
  shuffleRows: "Rows will now shuffle. Adapt quickly and stay sharp!",
};

const coachLines: Record<CoachStyle, Record<string, string>> = {
  zen: {
    mirrorX: "Like a calm lake... everything reflects.",
    mirrorY: "As above, so below. Feel the shift.",
    rotate90: "Embrace new angles of thought.",
    shuffleRows: "Let go of order. Embrace the flow.",
  },
  hype: {
    mirrorX: "WOO! Mirror time! Flip that brain!",
    mirrorY: "BOOM! Upside down vibes!",
    rotate90: "Twist it! Let’s GO!",
    shuffleRows: "Mix it up! Keep it spicy!",
  },
  wise: {
    mirrorX: "A mirrored board reveals new truths.",
    mirrorY: "Look again—perspective shifts everything.",
    rotate90: "Rotation challenges the keenest minds.",
    shuffleRows: "Disruption breeds innovation.",
  },
  chill: {
    mirrorX: "Just a lil flip. No stress 😌",
    mirrorY: "We vibin’... just upside down.",
    rotate90: "Flip your head around. Still chill.",
    shuffleRows: "Scrambled? Eh, still a good time.",
  },
};

const ModifierIntro: React.FC<ModifierIntroProps> = ({
  modifier,
  coachStyle,
  voiceEnabled,
  onClose,
}) => {
  const [playUnlock] = useSound(unlockSound, { volume: 0.4 });

  useEffect(() => {
    playUnlock();
    if (voiceEnabled) {
      const line = coachLines[coachStyle][modifier];
      speak(line, coachStyle);
    }

    const timeout = setTimeout(() => {
      onClose();
    }, 4500);

    return () => clearTimeout(timeout);
  }, [modifier, coachStyle, voiceEnabled, onClose, playUnlock]);

  return (
    <div className="modifier-intro">
      <h2>✨ New Modifier Unlocked: {modifier} ✨</h2>
      <div className={`modifier-visual ${modifier}`}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="cell" />
        ))}
        <div className="particles" />
      </div>
      <p className="description">{modifierDescriptions[modifier]}</p>
    </div>
  );
};

export default ModifierIntro;
