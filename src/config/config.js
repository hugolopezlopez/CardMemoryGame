export const levels = [
  {rows: 4, columns: 4, difficulty: "EASY"},
  {rows: 4, columns: 6, difficulty: "MEDIUM"},
  {rows: 5, columns: 6, difficulty: "DIFFICULT"}
];
export const playTime = 60;//Sec
export const scoreSettings = {
  completionPoints: {
    "4X4": 5000,
    "4X6": 8000,
    "5X6": 11000,
  },
  accuracyBonus: 2500,
  extraAttemptPenalty: 400,
  speedBonusThresholds: {
    "4X4": 7000,
    "4X6": 10000,
    "5X6": 13000,
  },
  speedBonusPerSecond: 5,
  maxSpeedBonus: 300,
};
export const showCardTime = 500;//milliSec
export const flipCardTime = "0.3";//Sec
export const images = [//TODO: Get images from future server or get images names from image folder.
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
];
