const Leaderboard = ({
  leaderboard,
}: {
  leaderboard: {
    name: string;
    score: number;
    level?: number;
    time_bonus?: number;
    mistake_bonus?: number;
    total_bonus?: number;
  }[];
}) => {
  return (
    <div className="leaderboard">
      <h2>🏆 Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>Level</th>
            <th>⏱ Time Bonus</th>
            <th>✔️ Mistake Bonus</th>
            <th>💯 Total</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{entry.name}</td>
              <td>{entry.score}</td>
              <td>{entry.level ?? "-"}</td>
              <td>{entry.time_bonus ?? 0}</td>
              <td>{entry.mistake_bonus ?? 0}</td>
              <td>{(entry.score + (entry.total_bonus ?? 0))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
