import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import Finish from "./Finish";
import scoreService from "../../services/score.service";
import { strings } from "../../assets/strings";

describe("Testing Finish Component", () => {
  beforeEach(() => {
    scoreService.clearScores();
    scoreService.clearLastInitials();
  });

  it("should ask for initials when the game is resolved", () => {
    render(
      <Finish
        resolved={true}
        rows={4}
        columns={4}
        attempts={8}
        pairsLeft={0}
        timeUsed={10}
        onReturnToLevelSelection={() => {}}
      />
    );

    expect(screen.getByLabelText(strings.finish.enterInitials)).toBeInTheDocument();
    expect(screen.getByText(strings.finish.scoreToSave)).toBeInTheDocument();
    expect(screen.getByText("7750")).toBeInTheDocument();
    expect(screen.getByText(`${strings.finish.mode}: 4X4`)).toBeInTheDocument();
    expect(screen.getByText(`${strings.finish.attempts}: 8`)).toBeInTheDocument();
    expect(screen.getByText(`${strings.finish.time}: 10s`)).toBeInTheDocument();
    expect(screen.queryByText(/performance|unlock/i)).not.toBeInTheDocument();
  });

  it("should not ask for initials when the game is lost", () => {
    render(
      <Finish
        resolved={false}
        failure={true}
        rows={4}
        columns={4}
        attempts={8}
        pairsLeft={4}
        timeUsed={60}
        onReturnToLevelSelection={() => {}}
      />
    );

    expect(screen.queryByLabelText(strings.finish.enterInitials)).not.toBeInTheDocument();
  });

  it("should save a score with three initials", () => {
    render(
      <Finish
        resolved={true}
        rows={4}
        columns={4}
        attempts={8}
        pairsLeft={0}
        timeUsed={10}
        onReturnToLevelSelection={() => {}}
      />
    );

    fireEvent.change(screen.getByLabelText(strings.finish.enterInitials), {
      target: { value: "abc" },
    });
    fireEvent.click(screen.getByText(strings.finish.saveScore));

    expect(screen.getByText("ABC")).toBeInTheDocument();
    expect(screen.getByText("4X4")).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "7750" })).toBeInTheDocument();
  });

  it("should prefill the last initials", () => {
    scoreService.setLastInitials("xyz");

    render(
      <Finish
        resolved={true}
        rows={4}
        columns={4}
        attempts={8}
        pairsLeft={0}
        timeUsed={10}
        onReturnToLevelSelection={() => {}}
      />
    );

    expect(screen.getByLabelText(strings.finish.enterInitials)).toHaveValue("XYZ");
  });
});
