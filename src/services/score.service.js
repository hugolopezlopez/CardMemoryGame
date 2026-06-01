const scores = [];
let lastInitials = "";

class ScoreService {
  calculateScore = ({ rows, columns, attempts, timeUsed, resolved }) => {
    if (!resolved || attempts <= 0) {
      return 0;
    }

    const minimumAttempts = (rows * columns) / 2;
    const extraAttempts = Math.max(0, attempts - minimumAttempts);
    const timePenalty = Math.max(0, timeUsed) * 100;
    const attemptPenalty = extraAttempts * 250;

    return Math.max(0, Math.round(10000 - timePenalty - attemptPenalty));
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

    return newScore;
  };

  getScores = () => {
    return [...scores];
  };

  clearScores = () => {
    scores.splice(0, scores.length);
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
