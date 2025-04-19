import React from "react";

interface ScoreBoardProps {
  voiceEnabled: boolean;
  setVoiceEnabled: (v: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  autoHintEnabled: boolean;
  setAutoHintEnabled: (v: boolean) => void;
  showInsights: boolean;
  setShowInsights: (v: boolean) => void;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  voiceEnabled,
  setVoiceEnabled,
  soundEnabled,
  setSoundEnabled,
  autoHintEnabled,
  setAutoHintEnabled,
  showInsights,
  setShowInsights,
}) => {
  return (
    <div className="settings-board">
      <div className="settings-bar">
        <label>
          <input
            type="checkbox"
            checked={voiceEnabled}
            onChange={(e) => setVoiceEnabled(e.target.checked)}
          />
          🔊 Voice
        </label>
        <label>
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={() => setSoundEnabled(!soundEnabled)}
          />
          🎵 Sound
        </label>
        <label>
          <input
            type="checkbox"
            checked={autoHintEnabled}
            onChange={() => setAutoHintEnabled(!autoHintEnabled)}
          />
          💡 Auto Hint
        </label>
        <label>
          <input
            type="checkbox"
            checked={showInsights}
            onChange={() => setShowInsights(!showInsights)}
          />
          🧠 Insights
        </label>
      </div>
    </div>
  );
};

export default ScoreBoard;
