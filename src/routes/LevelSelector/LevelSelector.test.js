//LevelSelector.test.js

import React from "react";
import LevelSelector from "./LevelSelector";
import { render, screen } from "@testing-library/react";
import { strings } from "../../assets/strings";

describe("Testing LevelSelector Component", () => {
  it("snapshot LevelSelector component", () => {
    const { asFragment } = render(<LevelSelector />);
    expect(asFragment(<LevelSelector />)).toMatchSnapshot();
  });

  it("should render the right title", () => {
    const title = strings.levelSelector.title;
    render(<LevelSelector />);
    expect(screen.getByText(title)).not.toBeNull();
  });

  it('should render the subtitle text', () => {
    render(<LevelSelector />);
    expect(screen.getByText(/Choose the difficulty level:/i)).toBeInTheDocument();
  });

  it('should render three buttons', () => {
    render(<LevelSelector />);
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });
  
  it("should render the instructions text", () => {
    const title = strings.levelSelector.instructions;
    render(<LevelSelector />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

});
