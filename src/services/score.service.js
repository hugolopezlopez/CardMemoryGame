import { playTime, scoreSettings } from "../config/config";

const SCORES_STORAGE_KEY = "card-memory-game-scores";
const SCORE_VERSION = 3;

const getScoreBreakdown = ({ rows, columns, attempts, timeUsed, resolved }) => {
  if (!resolved || attempts <= 0) {
    return {
      performanceScore: 0,
      speedBonus: 0,
      speedBonusThreshold: 0,
      speedBonusUnlocked: false,
      totalScore: 0,
    };
  }

  const mode =
    rows <= columns ? `${rows}X${columns}` : `${columns}X${rows}`;
  const minimumAttempts = (rows * columns) / 2;
  const extraAttempts = Math.max(0, attempts - minimumAttempts);
  const completionPoints = scoreSettings.completionPoints[mode] || 5000;
  const speedBonusThreshold =
    scoreSettings.speedBonusThresholds[mode] || completionPoints + 2000;
  const accuracyBonus =
    scoreSettings.accuracyBonus -
    extraAttempts * scoreSettings.extraAttemptPenalty;
  const performanceScore = Math.max(0, completionPoints + accuracyBonus);
  const speedBonusUnlocked = performanceScore >= speedBonusThreshold;
  const timeSaved = Math.max(0, playTime - timeUsed);
  const speedBonus = speedBonusUnlocked
    ? Math.min(
        scoreSettings.maxSpeedBonus,
        timeSaved * scoreSettings.speedBonusPerSecond
      )
    : 0;

  return {
    performanceScore,
    speedBonus,
    speedBonusThreshold,
    speedBonusUnlocked,
    totalScore: performanceScore + speedBonus,
  };
};

const loadScores = () => {
  try {
    if (typeof window === "undefined") {
      return [];
    }

    const storedScores = window.localStorage.getItem(SCORES_STORAGE_KEY);
    const parsedScores = storedScores ? JSON.parse(storedScores) : [];
    if (!Array.isArray(parsedScores)) {
      return [];
    }

    return parsedScores
      .filter(
        (savedScore) =>
          savedScore &&
          Number.isFinite(savedScore.rows) &&
          Number.isFinite(savedScore.columns) &&
          Number.isFinite(savedScore.attempts) &&
          Number.isFinite(savedScore.timeUsed)
      )
      .map((savedScore) => {
        if (savedScore.scoreVersion === SCORE_VERSION) {
          return savedScore;
        }

        return {
          ...savedScore,
          score: getScoreBreakdown({
            ...savedScore,
            resolved: true,
          }).totalScore,
          scoreVersion: SCORE_VERSION,
        };
      });
  } catch (error) {
    return [];
  }
};

const scores = loadScores();
let lastInitials = "";

class ScoreService {
  calculateScore = ({ rows, columns, attempts, timeUsed, resolved }) => {
    return getScoreBreakdown({
      rows,
      columns,
      attempts,
      timeUsed,
      resolved,
    }).totalScore;
  };

  calculateScoreBreakdown = ({ rows, columns, attempts, timeUsed, resolved }) => {
    return getScoreBreakdown({
      rows,
      columns,
      attempts,
      timeUsed,
      resolved,
    });
  };

  addScore = ({ initials, rows, columns, attempts, timeUsed, score }) => {
    this.setLastInitials(initials);

    const newScore = {
      id: `${Date.now()}-${scores.length}`,
      initials: lastInitials,
      mode: this.getMode(rows, columns),
      rows,
      columns,
      attempts,
      timeUsed,
      score,
      scoreVersion: SCORE_VERSION,
    };

    scores.push(newScore);
    scores.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      if (a.timeUsed !== b.timeUsed) {
        return a.timeUsed - b.timeUsed;
      }
      return a.attempts - b.attempts;
    });
    this.persistScores();

    return newScore;
  };

  getScores = () => {
    return [...scores];
  };

  clearScores = () => {
    scores.splice(0, scores.length);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(SCORES_STORAGE_KEY);
      }
    } catch (error) {
      // Keep the in-memory score list usable when browser storage is unavailable.
    }
  };

  persistScores = () => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(SCORES_STORAGE_KEY, JSON.stringify(scores));
      }
    } catch (error) {
      // Keep the game usable when browser storage is unavailable or full.
    }
  };

  getLastInitials = () => {
    return lastInitials;
  };

  setLastInitials = (initials) => {
    lastInitials = initials
      .replace(/[^a-z]/gi, "")
      .slice(0, 3)
      .toUpperCase();
  };

  clearLastInitials = () => {
    lastInitials = "";
  };

  getMode = (rows, columns) => {
    return `${rows}X${columns}`;
  };
}

const scoreService = new ScoreService();

Object.freeze(scoreService);

export default scoreService;
