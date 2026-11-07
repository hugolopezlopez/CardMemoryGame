export const strings = {
  levelSelector: {
    title: "Card Memory Game",
    subTitle: "Choose the difficulty level:",
    levelButton: (rows, columns, difficulty) => (`${rows}X${columns} (${difficulty})`),
    instructions: "The game starts with all the cards face down. Try to find all the card couples, in less than a minute, turning over two by two cards each time. When a couple is found, the two cards will disappear. Good luck!"
  },
  finish: {
    congrats: "Congratulations, you solved the Board!!!",
    restart: "Restart",
    timeOut: "Sorry, time is over, let's try again",
    enterInitials: "Enter your initials",
    initialsPlaceholder: "AAA",
    saveScore: "Save score",
    score: "Score",
    scoreToSave: "Score to save",
    scoresTitle: "Scores",
    noScores: "No scores yet",
    player: "Player",
    mode: "Mode",
    attempts: "Attempts",
    time: "Time"
  },
  playScreen: {
    pairsLeft: "Pairs left",
    attempts: "Attempts",
    back: "< back",
    secondsLeft: "Seconds left"
  }
};
