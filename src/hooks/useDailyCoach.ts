import { CoachStyle } from "../types/coach";
import { getDailyStats } from "../utils/dailyCoach";

export function useDailyCoach(style: CoachStyle) {
  const today = new Date().toLocaleDateString();

  const getDailyCoachMessage = () => {
    const stats = getDailyStats();

    if (!stats || stats.date !== today) {
      return welcomeMessage[style];
    }

    return `Yesterday, your streak was ${stats.streak}. ${progressMessage[style]}`;
  };

  const welcomeMessage: Record<CoachStyle, string> = {
    zen: "Another peaceful day. Let’s find balance in the patterns.",
    hype: "Let’s crush it today! 🔥 New day, new puzzle!",
    wise: "Every day is a chance to sharpen your mind.",
    chill: "Yo! New grid, new vibes. Let's float through it. 😎",
  };

  const progressMessage: Record<CoachStyle, string> = {
    zen: "Let’s keep calm focus and match the flow today.",
    hype: "Go even harder today – let’s smash that record!",
    wise: "Keep evolving. Patience and precision win.",
    chill: "No stress – just groove with the grid today.",
  };

  return { getDailyCoachMessage };
}
