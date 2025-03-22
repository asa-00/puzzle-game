// src/components/Leaderboard.tsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Leaderboard: React.FC = () => {
  const [scores, setScores] = useState<any[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      const scoresCollection = collection(db, 'leaderboard');
      const scoresSnapshot = await getDocs(scoresCollection);
      const scoresList = scoresSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setScores(scoresList);
    };

    fetchScores();
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {scores.map(score => (
          <li key={score.id}>{score.name}: {score.points}</li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;