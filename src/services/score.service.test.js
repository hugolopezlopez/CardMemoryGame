import scoreService from "./score.service";

describe("Testing ScoreService", () => {
  beforeEach(() => {
    scoreService.clearScores();
    scoreService.clearLastInitials();
  });

  it("should award completion, accuracy, and capped speed points", () => {
    const score = scoreService.calculateScore({
      rows: 4,
      columns: 4,
      attempts: 8,
      timeUsed: 0,
      resolved: true,
    });

    expect(score).toBe(7800);
  });

  it("should unlock the speed bonus after reaching the performance threshold", () => {
    const score = scoreService.calculateScore({
      rows: 4,
      columns: 4,
      attempts: 10,
      timeUsed: 20,
      resolved: true,
    });

    expect(score).toBe(7200);
  });

  it("should withhold the speed bonus below the performance threshold", () => {
    const score = scoreService.calculateScore({
      rows: 4,
      columns: 4,
      attempts: 11,
      timeUsed: 10,
      resolved: true,
    });

    expect(score).toBe(6750);
  });

  it("should award a higher completion score for the difficult mode", () => {
    const score = scoreService.calculateScore({
      rows: 5,
      columns: 6,
      attempts: 17,
      timeUsed: 60,
      resolved: true,
    });

    expect(score).toBe(11000);
  });

  it("should keep saved scores sorted by score", () => {
    scoreService.addScore({
      initials: "abc",
      rows: 4,
      columns: 4,
      attempts: 10,
      timeUsed: 20,
      score: 7500,
    });
    scoreService.addScore({
      initials: "xyz",
      rows: 4,
      columns: 6,
      attempts: 12,
      timeUsed: 10,
      score: 9000,
    });

    const scores = scoreService.getScores();

    expect(scores[0].initials).toBe("XYZ");
    expect(scores[1].initials).toBe("ABC");
  });

  it("should remember the last initials in memory", () => {
    scoreService.setLastInitials("ab1cde");

    expect(scoreService.getLastInitials()).toBe("ABC");
  });
});
