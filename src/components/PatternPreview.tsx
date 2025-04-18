import React, { useEffect, useState, useRef } from "react";
import { speak } from "../utils/voiceCoach";
import { CoachStyle } from "../types/coach";
import ModifierDisplay from "./ModifierDisplay";

interface PatternPreviewProps {
  pattern: number[];
  gridSize: number;
  duration: number;
  onComplete: () => void;
  coachStyle?: CoachStyle;
  voiceEnabled?: boolean;
  modifiers?: string[];
  strategyName?: string; 
}
const previewLines: Record<string, Record<CoachStyle, string>> = {
  deductive: {
    zen: "Observe. Each row contains a single truth.",
    hype: "One per row. Let’s hunt 'em down!",
    wise: "Every row reveals exactly one clue.",
    chill: "One click per row. Sounds simple, right?",
  },
  diagonal: {
    zen: "A path of balance – from corner to corner.",
    hype: "It’s a diagonal! Blast through it!",
    wise: "Recognize the slope. Predict the next step.",
    chill: "Just a chill diagonal. Follow the flow.",
  }
};

/* const coachPreviewLines: Record<CoachStyle, string> = {
  zen: "Focus... and remember this flow.",
  hype: "YO! Eyes open – here's the pattern!",
  wise: "Observe carefully, knowledge comes swiftly.",
  chill: "You got this. Just vibe with it.",
}; */

const logicTitles: Record<string, string> = {
  "deductive": "Deduce the Pattern",
  "logic-one-per-row": "Deduce: One Per Row",
  "mirror": "Memorize: Mirror Logic",
  "diagonal": "Memorize: Diagonal Flow",
  "checkered": "Observe: Alternating Cells",
  "cluster": "Memorize: Center Cluster",
};

const PatternPreview: React.FC<PatternPreviewProps> = ({
  pattern,
  gridSize,
  duration,
  onComplete,
  coachStyle = "zen",
  voiceEnabled = true,
  modifiers,
  strategyName = "random", 
}) => {
  const [countdown, setCountdown] = useState(Math.ceil(duration / 1000));
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onCompleteRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!voiceEnabled) return;
  
    const voiceLine =
      previewLines[strategyName]?.[coachStyle] ??
      "Let’s take a look at the pattern...";
  
    speak(voiceLine, coachStyle);
  }, []);

/*   useEffect(() => {
    if (!voiceEnabled) return;
    if (strategyName.startsWith("logic") || strategyName === "deductive") {
      const line = {
        zen: "Observe the pattern with clarity. Each clue has purpose.",
        hype: "Alright! Look sharp – logic wins this round!",
        wise: "Deduction is your sharpest tool. Analyze with care.",
        chill: "Logic vibes incoming. Take your time."
      }[coachStyle];
      speak(line, coachStyle);
    }
  }, [coachStyle, voiceEnabled, strategyName]); */

/*   useEffect(() => {
    if (voiceEnabled) {
      speak(coachPreviewLines[coachStyle], coachStyle);
    }
  }, [voiceEnabled, coachStyle]); */

  const readableTitle =
    logicTitles[strategyName] || (strategyName.startsWith("logic-") ? "Deduce the Pattern" : "Memorize the Pattern");

  return (
    <div className={`pattern-preview ${strategyName?.startsWith("logic-") ? "logical" : ""}`}>
      <div className="text-container">
        <h2 className="preview-heading">{readableTitle}</h2>
        <div className="strategy-label">🧩 Strategy: {strategyName}</div>
        <p className="countdown">
          Game starts in {countdown} second{countdown !== 1 ? "s" : ""}...
        </p>
      </div>
      <div
        className="preview-grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {pattern.map((value, index) => (
          <div
            key={index}
            className={`preview-cell ${value === 1 ? "active animate-in" : ""}`}
          />
        ))}
      </div>
      {modifiers && modifiers.length > 0 && <ModifierDisplay modifiers={modifiers} />}
    </div>
  );
};

export default PatternPreview;
