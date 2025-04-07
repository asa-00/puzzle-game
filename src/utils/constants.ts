import { CoachStyle } from "../types/coach";

export const inactiveMessages: Record<CoachStyle, string> = {
    zen: "Breathe... then make your next move.",
    hype: "Yo! Still there? Let’s gooo!",
    wise: "The puzzle waits for no one, my friend.",
    chill: "No rush, but the grid misses you 😄",
  };
  
  export const improvementMessages: Record<CoachStyle, string> = {
    zen: "Your movements are flowing with clarity. Keep going.",
    hype: "You're killin’ it! Keep that fire burning! 🔥",
    wise: "I see progress. Keep sharpening your skills.",
    chill: "Nice moves! You're vibin' with the grid 😎",
  };
  
  export const lowFocusFeedback: Record<CoachStyle, string> = {
    zen: "Your energy is scattered. Take a breath. Regain your focus.",
    hype: "Yo, you're fading! Lock in and bounce back!",
    wise: "Your clarity is slipping. Step back, reflect, and return stronger.",
    chill: "Heads up, you're drifting a bit. No stress — just ease back into the zone 😌",
  };

 export const focusMessages: Record<CoachStyle, string> = {
    zen: "Your mind is drifting. Recenter and continue 🧘",
    hype: "Yo, stay sharp! Bring that energy back! 🔥",
    wise: "Your focus fades, young one. Regain your clarity.",
    chill: "Hey, don’t zone out now. Let’s keep cruisin’. 😎",
  };