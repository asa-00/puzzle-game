export type CoachStyle = "zen" | "hype" | "wise" | "chill";

export type Mood = "tip" | "praise" | "error" | "struggling" | "boost" | "normal" | "confident" | "focused";

export interface CoachFeedback {
  message: string;
  style: {
    mood: Mood;
    styleTip: string;
  };
  tip?: string;
}