// src/components/StatusBar.tsx

interface StatusBarProps {
  timer: number;
  consecutiveMistakes: number;
  maxMistakes: number;
  focusMeter: number; // 0–100
  streak: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ timer, consecutiveMistakes, maxMistakes, focusMeter, streak }) => {
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
      <div className="status-item">
        <div className="coach-streak">🔥 Streak: {streak}</div>
      </div>
    </div>
  );
};

export default StatusBar;
