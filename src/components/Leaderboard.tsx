const Leaderboard = ({ leaderboard }: { leaderboard: { name: string; score: number }[] }) => (
  <div className="leaderboard">
    <h2>Leaderboard</h2>
    <ul>
      {leaderboard.map((entry, i) => (
        <li key={i}>{entry.name} – {entry.score}</li>
      ))}
    </ul>
  </div>
);
export default Leaderboard;
