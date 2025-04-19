import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSound from "use-sound";
import { useGameLogic } from "./hooks/useGameLogic";
import StartScreen from "./components/StartScreen";
import GameBoard from "./components/GameBoard";
import StatusBar from "./components/StatusBar";
import RowHints from "./components/RowHints";
import GameOverScreen from "./components/GameOverScreen";
import Leaderboard from "./components/Leaderboard";
import LevelUpPopup from "./components/LevelUpPopup";
import DevPanel from "./components/DevPanel";
import CoachChallenge from "./components/CoachChallenge";
import PatternPreview from "./components/PatternPreview";
import ModifierIntro from "./components/ModifierIntro";
import "./styles/main.scss";
import { usePlayerProfile } from "./hooks/usePlayerProfile";
import { useGameEventTracker } from "./hooks/useGameEventTracker";
import { closingLines, levelUpLines, useCoachAI } from "./hooks/useCoachAI";
import { useCoachMemory } from "./hooks/useCoachMemory";
import CoachInsights from "./components/CoachInsights";
import startSound from "../assets/sounds/start-button.mp3";
import challangeCompleted from "../assets/sounds/challange-completed.mp3";
import bgMusic from "../assets/sounds/zen-background.mp3";
import correctSound from "../assets/sounds/correct.mp3";
import wrongSound from "../assets/sounds/wrong.mp3";
import levelUpSound from "../assets/sounds/level-up.mp3";
import hintSound from "../assets/sounds/hint.mp3";
import bonusSound from "../assets/sounds/bonus.mp3";
import { useDailyCoach } from "./hooks/useDailyCoach";
import { useVoiceCoach } from "./hooks/useVoiceCoach";
import { speak } from "./utils/voiceCoach";
import { saveDailyStats } from "./utils/dailyCoach";
import { CoachStyle } from "./types/coach";
import CoachPanel from "./components/CoachPanel";
import DailyMessage from "./components/DailyMessage";
import GoalMedalPopup from "./components/GoalMedalPopup";
import {
  inactiveMessages,
  improvementMessages,
  lowFocusFeedback,
  focusMessages,
} from "./utils/constants";
import ModifierDisplay from "./components/ModifierDisplay";

const MAX_WRONG_GUESSES = 500;
const MAX_MISTAKES = 5;

const styleCooldowns: Record<CoachStyle, number> = {
  zen: 20000,
  hype: 8000,
  wise: 15000,
  chill: 12000,
};

const App = ({
  previewMode = false,
  previewLevel = 1,
  previewStyle = "zen",
  debugHints = false,
}) => {
  const {
    grid,
    gridSize,
    score,
    difficulty,
    gameStarted,
    gameOver,
    leaderboard,
    handleClick: gameHandleClick,
    startGame,
    saveScore,
    pattern,
    getHint,
    showHint,
    useHint,
    hintAvailable,
    setHintAvailable,
    triggerGameOver,
    currentLevel,
    justLeveledUp,
    clearLevelUpInfo,
    levelUpInfo,
    unlockedFeatures,
    rowHints,
    colHints,
    rowStatuses,
    colStatuses,
    consecutiveMistakes,
    focus,
    levelTimer,
    scoreSaved,
    resetGame,
    modifiers,
    bonusTileIndex,
    bonusActive,
    timeBonus,
    mistakeBonus,
    strategyName,
    goal,
    goalCompleted,
  } = useGameLogic({ levelOverride: previewMode ? previewLevel : undefined });

  const [playStart] = useSound(startSound, { volume: 0.2 });
  const [playCorrect] = useSound(correctSound, { volume: 0.2 });
  const [playWrong] = useSound(wrongSound, { volume: 0.2 });
  const [playHint] = useSound(hintSound, { volume: 0.2 });
  const [playBonusSound] = useSound(bonusSound, { volume: 0.2 });
  const [playChallengeSound] = useSound(challangeCompleted, { volume: 0.2 });
  const [playBgMusic, { stop: stopBgMusic }] = useSound(bgMusic, {
    volume: 0.08,
    loop: true,
  });
  const [playLevelUp] = useSound(levelUpSound, { volume: 0.2 });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lowFocusSpoken, setLowFocusSpoken] = useState(false);
  const { events, logEvent } = useGameEventTracker();
  const playerType = usePlayerProfile(events);
  const [coachStyle, setCoachStyle] = useState<CoachStyle>(
    (localStorage.getItem("coachStyle") as CoachStyle) || previewStyle
  );
  const { getChallengeStatus } = useCoachMemory();
  const challenge = getChallengeStatus();

  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(() => {
    const stored = localStorage.getItem("voiceEnabled");
    return stored ? JSON.parse(stored) : true;
  });

  const [autoHintEnabled, setAutoHintEnabled] = useState(false);
  const [hintStepIndex, setHintStepIndex] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [showDevPanel, setShowDevPanel] = useState(false);
  const coachMemory = useCoachMemory();
  const { getDailyCoachMessage } = useDailyCoach(coachStyle);
  const [dailyMessageSpoken, setDailyMessageSpoken] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const lastImprovementSpoken = useRef<number>(0);
  const [inactiveTime, setInactiveTime] = useState(0);
  const [challengeReminderSpoken, setChallengeReminderSpoken] = useState(false);
  const [showChallengePopup, setShowChallengePopup] = useState(false);
  const { triggerVoice } = useVoiceCoach(coachStyle, voiceEnabled);
  const hintDelay = unlockedFeatures.includes("fastHints") ? 15000 : 30000;
  const lowFocusThreshold = 30;
  const isLowFocus = focus <= lowFocusThreshold;
  const [showStartScreen, setShowStartScreen] = useState(false);
  const [showPatternPreview, setShowPatternPreview] = useState(false);
  const [modifierIntro, setModifierIntro] = useState<string | null>(null);
  const [showGoalPopup, setShowGoalPopup] = useState(false);

  useEffect(() => {
    if (voiceEnabled && !dailyMessageSpoken && gameStarted) {
      const message = getDailyCoachMessage(); //
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
      setDailyMessageSpoken(true);
    }
  }, [gameStarted, voiceEnabled, dailyMessageSpoken]);

  useEffect(() => {
    if (!voiceEnabled || gameOver || !gameStarted) return;

    if (focus < 30 && !lowFocusSpoken) {
      speak(focusMessages[coachStyle], coachStyle);
      setLowFocusSpoken(true);
    } else if (focus >= 30 && lowFocusSpoken) {
      setLowFocusSpoken(false);
    }
  }, [focus, voiceEnabled, coachStyle, lowFocusSpoken, gameStarted, gameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.shiftKey &&
        e.key.toLowerCase() === "d" &&
        unlockedFeatures.includes("devMode")
      ) {
        setShowDevPanel((prev) => !prev);
      }
      if (e.shiftKey && e.key.toLowerCase() === "i") {
        setShowInsights((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setInactiveTime((prev) => prev + 1);

      if (voiceEnabled && inactiveTime === 45) {
        speak(inactiveMessages[coachStyle], coachStyle);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [inactiveTime]);

  useEffect(() => {
    if (autoHintEnabled && hintAvailable && inactiveTime >= 30) {
      const hints = getHint();
      if (hintStepIndex < hints.length) {
        const nextHint = hints[hintStepIndex];
        const el = document.querySelector(`.cell:nth-child(${nextHint + 1})`);
        if (el) {
          el.classList.add("flash-hint");
          setTimeout(() => el.classList.remove("flash-hint"), 1000);
        }
        setHintStepIndex(hintStepIndex + 1);
      }
    }
  }, [inactiveTime]);

  useEffect(() => {
    if (levelUpInfo) {
      playLevelUp();
    }
  }, [levelUpInfo, playLevelUp]);

  useEffect(() => {
    localStorage.setItem("coachStyle", coachStyle);
  }, [coachStyle]);

  useEffect(() => {
    localStorage.setItem("voiceEnabled", JSON.stringify(voiceEnabled));
  }, [voiceEnabled]);

  const { generateFeedback, mood: coachMood } = useCoachAI({
    pattern,
    grid,
    hintAvailable,
    showHint,
    moodProfile: coachMemory.analyzeMood(),
    rowStatuses,
    colStatuses,
    personality: coachStyle,
    strategyName,
  });

  const coachFeedback = generateFeedback();

  const handleClick = (index: number) => {
    const isCurrentlyActive = grid[index].active;
    const willBeActive = !isCurrentlyActive;
    const shouldBeActive = pattern[index] === 1;
    const wasCorrect = willBeActive === shouldBeActive;

    logEvent(wasCorrect);
    gameHandleClick(index);

    const row = Math.floor(index / gridSize);
    if (rowStatuses[row]) {
      const messages: Record<CoachStyle, string> = {
        zen: "A row complete. Harmony is forming.",
        hype: "BOOM! You nailed that row!",
        wise: "Precision is your ally. Well done.",
        chill: "That row? Clean. 😎",
      };
      speak(messages[coachStyle], coachStyle);
    }

    coachMemory.logMove(wasCorrect);
    setInactiveTime(0);
    setHintStepIndex(0);

    if (!wasCorrect && focus - 10 <= 30) {
      speak(lowFocusFeedback[coachStyle], coachStyle);
    }

    if (!wasCorrect) {
      setWrongGuesses((prev) => {
        const updated = prev + 1;
        if (updated >= MAX_WRONG_GUESSES) {
          stopBgMusic();
          triggerGameOver();
        }
        return updated;
      });
    }

    if (soundEnabled) {
      wasCorrect ? playCorrect() : playWrong();
    }

    if (index === bonusTileIndex && !grid[index].active && bonusActive) {
      if (soundEnabled) playBonusSound();
      toast("🎉 Bonus tile hit!");
    }
  };

  const handleStart = () => {
    startGame();
    setShowStartScreen(false);
    coachMemory.resetMemory();
    setWrongGuesses(0);
    setInactiveTime(0);
    setHintStepIndex(0);
    setDailyMessageSpoken(false);
    setChallengeReminderSpoken(false);
    setLowFocusSpoken(false);
    setShowPatternPreview(true);

    if (soundEnabled) {
      playStart();
      playBgMusic();
    }
  };

  const handleBackToStart = () => {
    stopBgMusic();
    resetGame();
    setShowStartScreen(true);
  };

  const handleUseHint = () => {
    useHint();
    coachMemory.logHintUsed();
    playHint();
    setInactiveTime(0);
    setHintStepIndex(0);
  };

  useEffect(() => {
    const stored = localStorage.getItem("showInsights");
    if (stored) setShowInsights(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const now = Date.now();
    const cooldown = styleCooldowns[coachStyle];

    /*     if (coachMemory.analyzeMood() === "struggling") {
      setShowInsights(true);
    } */

    if (
      voiceEnabled &&
      coachMemory.isImproving() &&
      now - lastImprovementSpoken.current > cooldown
    ) {
      speak(improvementMessages[coachStyle], coachStyle);
      lastImprovementSpoken.current = now;
    }
  }, [grid, coachStyle, voiceEnabled]);

  useEffect(() => {
    const style = coachMemory.analyzeStyle();

    if (style === "methodical") {
      coachMemory.setChallenge(
        "Solve without any hints!",
        () => coachMemory.memory.hintUsage === 0
      );
    } else if (style === "explorer") {
      coachMemory.setChallenge(
        "Solve with less than 3 mistakes",
        () => coachMemory.memory.mistakeRate < 0.15
      );
    } else if (style === "intuitive") {
      coachMemory.setChallenge("Complete in under 30 seconds", () => {
        const moves = coachMemory.memory.recentMoves;
        if (moves.length === 0) return false;
        const timeSpan = moves[moves.length - 1].timestamp - moves[0].timestamp;
        return timeSpan < 30000;
      });
    }
  }, [currentLevel]);

  /* useEffect(() => {
    if (!voiceEnabled || challengeReminderSpoken) return;
    const challenge = coachMemory.getChallengeStatus();

    if (challenge?.description && !challenge.completed) {
      speak(`Today's challenge: ${challenge.description}`, coachStyle);
      setChallengeReminderSpoken(true);
    }
  }, [currentLevel, coachMemory.getChallengeStatus()]); */

  useEffect(() => {
    const challenge = coachMemory.getChallengeStatus();
    if (challenge?.completed) {
      triggerVoice("challengeComplete");
    }
  }, [coachMemory.getChallengeStatus()?.completed]);

  useEffect(() => {
    const challenge = coachMemory.getChallengeStatus();
    if (challenge?.completed && !showChallengePopup) {
      playChallengeSound();
      setShowChallengePopup(true);
      setTimeout(() => setShowChallengePopup(false), 4000);
    }
  }, [grid]);

  useEffect(() => {
    localStorage.setItem("showInsights", JSON.stringify(showInsights));
  }, [showInsights]);

  useEffect(() => {
    if (justLeveledUp && levelUpInfo) {
      console.log("🎯 Level up info:", levelUpInfo);
      const newModifier = levelUpInfo.unlocks.find((f) =>
        ["mirrorX", "rotate90", "shuffleRows"].includes(f)
      );
      if (newModifier) {
        setModifierIntro(newModifier);
      }
    }
  }, [justLeveledUp, levelUpInfo]);

  useEffect(() => {
    if (gameOver || justLeveledUp) {
      saveDailyStats({
        date: new Date().toLocaleDateString(),
        streak: coachMemory.getStreak(),
        mood: coachMemory.analyzeMood(),
        style: coachStyle,
      });
    }
  }, [gameOver, justLeveledUp]);

  useEffect(() => {
    if (justLeveledUp && levelUpInfo?.newModifier) {
      setModifierIntro(levelUpInfo.newModifier);
    }
  }, [justLeveledUp, levelUpInfo]);

  useEffect(() => {
    if (justLeveledUp && levelUpInfo) {
      setShowInsights(true);
      playLevelUp();

      if (levelUpInfo.unlocks.includes("tileAnimations")) {
        toast("✨ New feature unlocked: Tile animations activated!");
      }
    }
  }, [justLeveledUp, levelUpInfo]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const timer = setTimeout(() => setHintAvailable(true), hintDelay);
    return () => clearTimeout(timer);
  }, [grid, gameStarted, gameOver, hintDelay]);

  useEffect(() => {
    if (goalCompleted) {
      toast("🎯 Smart goal achieved!");
      setShowGoalPopup(true);
      coachMemory.logGoalCompleted(strategyName, currentLevel);
    }
  }, [goalCompleted]);

  if (gameOver) {
    return (
      <GameOverScreen
        score={score}
        onRestart={handleStart}
        onSave={saveScore}
        onBackToStart={handleBackToStart}
        leaderboard={leaderboard}
        scoreSaved={scoreSaved}
      />
    );
  }

  if (showPatternPreview) {
    return (
      <PatternPreview
        pattern={pattern}
        gridSize={gridSize}
        duration={3000}
        onComplete={() => {
          setShowPatternPreview(false);
          startGame();
        }}
        coachStyle={coachStyle}
        voiceEnabled={voiceEnabled}
        modifiers={modifiers}
      />
    );
  }

  if (!gameStarted || showStartScreen) {
    return <StartScreen onStart={handleStart} setCoachStyle={setCoachStyle} />;
  }

  return (
    <div className="app-container">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
      />
      {showGoalPopup && (
        <GoalMedalPopup onClose={() => setShowGoalPopup(false)} />
      )}
      <div className="score-board">
        Score: {score} | Level: {difficulty} | 🌱 Progression Level:{" "}
        {currentLevel}
        <div className="settings-bar">
          <label>
            <input
              type="checkbox"
              checked={voiceEnabled}
              onChange={(e) => setVoiceEnabled(e.target.checked)}
            />
            🔊 Voice Coach
          </label>
          <label style={{ marginLeft: "1rem" }}>
            🔊 Sound:
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={() => setSoundEnabled(!soundEnabled)}
            />
          </label>
          <label style={{ marginLeft: "1rem" }}>
            💡 Auto Hint:
            <input
              type="checkbox"
              checked={autoHintEnabled}
              onChange={() => setAutoHintEnabled(!autoHintEnabled)}
            />
          </label>
          <label style={{ marginLeft: "1rem" }}>
            🧠 Insights:
            <input
              type="checkbox"
              checked={showInsights}
              onChange={() => setShowInsights((prev) => !prev)}
            />
          </label>
        </div>
        {dailyMessageSpoken && (
          <DailyMessage message={getDailyCoachMessage()} style={coachStyle} />
        )}
      </div>
      {hintAvailable && !showHint && unlockedFeatures.includes("hint") && (
        <div className="hint-prompt">
          <p>Stuck? Want a hint?</p>
          <button onClick={handleUseHint}>Show Hint</button>
        </div>
      )}
      <div className="game-board-container">
        {modifiers.length > 0 && <ModifierDisplay modifiers={modifiers} />}
        <CoachPanel
          feedback={coachFeedback.message}
          playerType={playerType}
          personality={coachStyle}
          mood={coachMood}
          voiceEnabled={voiceEnabled}
          streak={coachMemory.getStreak()}
          style={coachFeedback.style.styleTip}
          tip={
            unlockedFeatures.includes("advancedCoach") ? coachFeedback.tip : ""
          }
          isImproving={coachMemory.isImproving()}
          challengeCompleted={coachMemory.getChallengeStatus()?.completed}
          unlockedFeatures={unlockedFeatures}
          lowFocus={isLowFocus}
        />
        <StatusBar
          timer={levelTimer}
          consecutiveMistakes={consecutiveMistakes}
          focusMeter={focus}
          maxMistakes={MAX_MISTAKES}
        />
        <div className="game-board-with-hints">
          <GameBoard
            grid={grid}
            gridSize={gridSize}
            handleClick={handleClick}
            showHint={showHint}
            hintIndexes={getHint()}
            unlockedFeatures={unlockedFeatures}
            rowHints={rowHints}
            colHints={colHints}
            rowStatuses={rowStatuses}
            colStatuses={colStatuses}
            modifiers={modifiers}
            bonusTileIndex={bonusTileIndex}
            bonusActive={bonusActive}
            debugHints={debugHints}
          />
        </div>
        {showDevPanel && <DevPanel memory={coachMemory.memory} />}
      </div>
      {challenge && (
        <CoachChallenge
          description={challenge.description}
          completed={challenge.completed}
          personality={coachStyle}
        />
      )}
      {justLeveledUp && levelUpInfo && !modifierIntro && (
        <LevelUpPopup
          level={levelUpInfo.level}
          unlocks={levelUpInfo.unlocks}
          reward={levelUpInfo.reward}
          timeBonus={timeBonus}
          mistakeBonus={mistakeBonus}
          coachStyle={coachStyle}
          voiceEnabled={voiceEnabled}
          onClose={() => {
            clearLevelUpInfo();

            if (voiceEnabled) {
              speak(levelUpLines[coachStyle], coachStyle);
            }

            const newModifier = levelUpInfo.unlocks.find((f) =>
              ["mirrorX", "rotate90", "shuffleRows"].includes(f)
            );
            if (newModifier) {
              setTimeout(() => {
                setModifierIntro(newModifier);
              }, 1500);
            }
          }}
        />
      )}

      {modifierIntro && (
        <ModifierIntro
          modifier={modifierIntro}
          coachStyle={coachStyle}
          voiceEnabled={voiceEnabled}
          onClose={() => {
            if (voiceEnabled) {
              speak(closingLines[coachStyle], coachStyle);
            }
            setModifierIntro(null);
          }}
        />
      )}
      {showInsights && (
        <CoachInsights
          memory={coachMemory.memory}
          mood={coachMemory.analyzeMood()}
          style={coachMemory.analyzeStyle()}
          strategy={coachMemory.suggestStrategy()}
          streak={coachMemory.getStreak()}
          personality={coachStyle}
        />
      )}
      <Leaderboard leaderboard={leaderboard} />
    </div>
  );
};

export default App;
