export function saveDailyStats(stats: {
    date: string;
    streak: number;
    mood: string;
    style: string;
  }) {
    localStorage.setItem("dailyStats", JSON.stringify(stats));
  }
  
  export function getDailyStats() {
    const data = localStorage.getItem("dailyStats");
    return data ? JSON.parse(data) : null;
  }
  