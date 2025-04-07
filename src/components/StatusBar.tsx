// src/components/StatusBar.tsx

interface StatusBarProps {
  timer: number;
  consecutiveMistakes: number;
  maxMistakes: number;
  focusMeter: number; // 0–100
}

const StatusBar: React.FC<StatusBarProps> = ({ timer, consecutiveMistakes, maxMistakes, focusMeter }) => {
  return (
    <div className="status-bar">
      <div className="status-item">⏳ Time: {timer}s</div>
      <div className="status-item">💥 Mistakes: {consecutiveMistakes}/{maxMistakes}</div>
      <div className="status-item focus">
        🧠 Focus:
        <div className="focus-meter">
          <div className="focus-fill" style={{ width: `${focusMeter}%` }} />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
