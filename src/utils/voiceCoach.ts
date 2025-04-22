// src/utils/voiceCoach.ts

export const speak = (
    message: string,
    personality: "zen" | "hype" | "wise" | "chill" = "zen",
    pitch = 1,
    rate = 1
  ) => {
    const synth = window.speechSynthesis;
    if (!synth) return;
  
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.pitch = pitch;
    utterance.rate = rate;
  
    const voiceMap: Record<string, { pitch: number; rate: number }> = {
      zen: { pitch: 0.9, rate: 0.85 },
      hype: { pitch: 1.4, rate: 1.2 },
      wise: { pitch: 0.8, rate: 0.8 },
      chill: { pitch: 1.0, rate: 0.95 },
    };
  
    const style = voiceMap[personality];
    utterance.pitch = style?.pitch;
    utterance.rate = style?.rate;
  
    const voices = synth.getVoices();
    if (voices.length > 0) {
      utterance.voice = voices.find((v) =>
        v.lang.startsWith("en")
      ) || voices[0];
    }
  
    synth.cancel(); 
    synth.speak(utterance);
  };
  