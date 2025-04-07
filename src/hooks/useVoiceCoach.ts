import { useRef } from "react";
import { speak } from "../utils/voiceCoach";
import { CoachStyle } from "../types/coach";

type TriggerType =
  | "levelUp"
  | "hintUsed"
  | "mistake"
  | "streak"
  | "start"
  | "challengeComplete";

export function useVoiceCoach(
  coachStyle: CoachStyle,
  voiceEnabled: boolean
) {
  const lastSpoken = useRef<string | null>(null);
  const lastTime = useRef<number>(0);

  const triggerVoice = (type: TriggerType) => {
    if (!voiceEnabled) return;

    const now = Date.now();
    if (now - lastTime.current < 5000) return; // Prevent spam

    const message = getVoiceMessage(type, coachStyle);
    if (message === lastSpoken.current) return;

    lastSpoken.current = message;
    lastTime.current = now;
    speak(message, coachStyle);
  };

  return { triggerVoice };
}

function getVoiceMessage(type: TriggerType, coach: CoachStyle): string {
  const voices: Record<TriggerType, Record<CoachStyle, string>> = {
    levelUp: {
      zen: "You’ve reached a new level. Breathe in. Enjoy the growth.",
      hype: "LEVEL UP! 🔥 You're crushing it!",
      wise: "Another step forward. The path is long, but you're walking it well.",
      chill: "Nice! Leveled up. Just keep vibin’.",
    },
    hintUsed: {
      zen: "Hints are guides. The real answer lies within.",
      hype: "Hint dropped! Boom! You're unstoppable!",
      wise: "Knowing when to seek guidance is a sign of wisdom.",
      chill: "No worries, take a little help. That's what hints are for.",
    },
    mistake: {
      zen: "Mistakes are moments of clarity in disguise.",
      hype: "Oops! But no big deal — shake it off!",
      wise: "Failure is just a stepping stone to mastery.",
      chill: "Wrong click? Eh, it happens. Keep cruising.",
    },
    streak: {
      zen: "You’ve found your rhythm.",
      hype: "Streak mode! 🔥🔥 Keep the energy!",
      wise: "Consistency builds greatness.",
      chill: "You’re on a roll, friend. Chill and thrill.",
    },
    start: {
      zen: "Every journey begins with a single mindful step.",
      hype: "Let’s GOOOOO! 🚀",
      wise: "Welcome. The journey to mastery begins now.",
      chill: "Game on. No stress, just fun.",
    },
    challengeComplete: {
        zen: "You have completed the challenge. Let that sense of growth sink in.",
        hype: "BOOM! Challenge done! You’re a total beast!",
        wise: "Well done. Mastery comes through overcoming trials.",
        chill: "Nice work champ. You just leveled up in style. 😎",
      },
  };

  return voices[type][coach];
}
