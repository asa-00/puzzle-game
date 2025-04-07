import { useRef, useState } from "react";

export interface GameEvent {
  reactionTime: number;
  wasCorrect: boolean;
  timestamp: number;
}

export const useGameEventTracker = () => {
  const [events, setEvents] = useState<GameEvent[]>([]);
  const lastClickTime = useRef<number>(Date.now());

  const logEvent = (wasCorrect: boolean) => {
    const now = Date.now();
    const reactionTime = now - lastClickTime.current;
    lastClickTime.current = now;

    const newEvent: GameEvent = {
      reactionTime,
      wasCorrect,
      timestamp: now,
    };

    setEvents((prev: any) => [...prev.slice(-30), newEvent]); // keep last 30 actions
  };

  return {
    events,
    logEvent,
  };
};