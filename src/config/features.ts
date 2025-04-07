export type FeatureId =
  | "voice"
  | "insight"
  | "hint"
  | "dailyMessage"
  | "coachChallenge"
  | "themeSwitch"
  | "advancedHints";

export const featureDescriptions: Record<FeatureId, string> = {
  voice: "Voice feedback from the coach helps immerse you in the puzzle experience.",
  insight: "Visual dashboard with personal stats and suggestions from your coach.",
  hint: "You can now reveal a part of the solution if you get stuck.",
  dailyMessage: "A motivational message from your coach each day to get started.",
  coachChallenge: "Earn extra rewards by completing daily coaching challenges.",
  themeSwitch: "Choose from different visual themes for a personalized look.",
  advancedHints: "Unlock smarter hint mechanics based on your puzzle behavior.",
};

export const defaultFeatureStates: Record<FeatureId, boolean> = {
  voice: false,
  insight: false,
  hint: false,
  dailyMessage: false,
  coachChallenge: false,
  themeSwitch: false,
  advancedHints: false,
};
