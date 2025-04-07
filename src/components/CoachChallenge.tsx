import React, {useState, useEffect} from "react";
import { CoachStyle } from "../types/coach";

interface CoachChallengeProps {
  description: string;
  completed: boolean;
  personality: CoachStyle;
}

const CoachChallenge: React.FC<CoachChallengeProps> = ({ description, completed, personality }) => {
    const [animate, setAnimate] = useState(false);
  
    useEffect(() => {
      if (completed) {
        setAnimate(true);
        const timer = setTimeout(() => setAnimate(false), 3000);
        return () => clearTimeout(timer);
      }
    }, [completed]);
  
    const statusText = completed ? "Completed!" : "Ongoing";
    const statusEmoji = completed ? "✅" : "🔥";
  
    return (
      <div className={`challenge-card ${personality} ${animate ? "pulse-glow" : ""}`}>
        <div className="challenge-header">
          <span className="emoji">{statusEmoji}</span>
          <span className="status">{statusText}</span>
        </div>
        <div className="challenge-desc">{description}</div>
      </div>
    );
  };
  
  export default CoachChallenge;
