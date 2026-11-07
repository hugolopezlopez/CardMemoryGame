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

    expect(score).toBe(8400);
  });

  it("should unlock the speed bonus after reaching the performance threshold", () => {
    const score = scoreService.calculateScore({
      rows: 4,
      columns: 4,
      attempts: 9,
      timeUsed: 20,
      resolved: true,
    });

    expect(score).toBe(7800);
  });

  it("should withhold the speed bonus below the performance threshold", () => {
    const score = scoreService.calculateScore({
      rows: 4,
      columns: 4,
      attempts: 10,
      timeUsed: 10,
      resolved: true,
    });

    expect(score).toBe(7400);
  });

  it("should give the difficult mode a higher score base", () => {
    const score = scoreService.calculateScore({
      rows: 5,
      columns: 6,
      attempts: 17,
      timeUsed: 60,
      resolved: true,
    });

    expect(score).toBe(12900);
  });

  it("should use the medium score settings in portrait orientation", () => {
    const portraitScore = scoreService.calculateScore({
      rows: 6,
      columns: 4,
      attempts: 13,
      timeUsed: 60,
      resolved: true,
    });
    const landscapeScore = scoreService.calculateScore({
      rows: 4,
      columns: 6,
      attempts: 13,
      timeUsed: 60,
      resolved: true,
    });

    expect(portraitScore).toBe(10200);
    expect(landscapeScore).toBe(portraitScore);
  });

  it("should keep scores distinct after many extra attempts", () => {
    const seventeenAttempts = scoreService.calculateScore({
      rows: 4,
      columns: 4,
      attempts: 17,
      timeUsed: 27,
      resolved: true,
    });
    const twentyAttempts = scoreService.calculateScore({
      rows: 4,
      columns: 4,
      attempts: 20,
      timeUsed: 33,
      resolved: true,
    });

    expect(seventeenAttempts).toBe(5130);
    expect(twentyAttempts).toBe(4170);
  });

  it("should award different scores for different completion times", () => {
    const fasterScore = scoreService.calculateScore({
      rows: 4,
      columns: 4,
      attempts: 20,
      timeUsed: 33,
      resolved: true,
    });
    const slowerScore = scoreService.calculateScore({
      rows: 4,
      columns: 4,
      attempts: 20,
      timeUsed: 35,
      resolved: true,
    });

    expect(fasterScore).toBe(4170);
    expect(slowerScore).toBe(4150);
    expect(fasterScore).toBeGreaterThan(slowerScore);
  });

  it("should award positive points whenever a board is resolved", () => {
    const score = scoreService.calculateScore({
      rows: 4,
      columns: 4,
      attempts: 27,
      timeUsed: 45,
      resolved: true,
    });

    expect(score).toBe(1950);
  });

  it("should keep unresolved games at zero points", () => {
    const score = scoreService.calculateScore({
      rows: 4,
      columns: 4,
      attempts: 27,
      timeUsed: 60,
      resolved: false,
    });

    expect(score).toBe(0);
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
