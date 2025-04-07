export interface LevelConfig {
  level: number;
  reward: string;
  unlocks: string[];
  challenge?: {
    description: string;
    condition: string;
  };
}

export const levels: LevelConfig[] = [
  {
    level: 1,
    reward: "Welcome to the game!",
    unlocks: []
  },
  {
    level: 2,
    reward: "You’ve unlocked the hint system. Use it wisely!",
    unlocks: ["hint"]
  },
  {
    level: 3,
    reward: "Hints now recharge faster.",
    unlocks: ["fastHints"]
  },
  {
    level: 4,
    reward: "Your coach is now smarter with dynamic feedback!",
    unlocks: ["advancedCoach"]
  },
  {
    level: 5,
    reward: "Enjoy beautiful new animations for correct tiles.",
    unlocks: ["tileAnimations"]
  },
  {
    level: 6,
    reward: "Visual stats dashboard unlocked!",
    unlocks: ["coachInsights"]
  },
  {
    level: 7,
    reward: "Personalized daily coaching now active!",
    unlocks: ["dailyCoach"]
  },
  {
    level: 8,
    reward: "Voice coach becomes more expressive!",
    unlocks: ["voiceTone"]
  },
  {
    level: 9,
    reward: "Challenge mode activated – prove your mastery!",
    unlocks: ["challenges"],
    challenge: {
      description: "Complete a puzzle without using any hints.",
      condition: "noHints"
    }
  },
  {
    level: 10,
    reward: "Unlocked grid customization and themes!",
    unlocks: ["gridThemes"]
  }
];
