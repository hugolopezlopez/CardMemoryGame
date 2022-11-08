//PlayScreen.test.js

import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import PlayScreen from "./PlayScreen";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({rows: 4, columns: 4});

describe('Testing PlayScreen Component', () => {
  it('should render 33 images', () => {
    render(<Provider store={store}><PlayScreen store={store} /></Provider>);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(33);
  });

  it('should render 49 images', () => {
    const store = mockStore({rows: 4, columns: 6});
    render(<Provider store={store}><PlayScreen store={store} /></Provider>);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(49);
  });

  it('should render 61 images', () => {
    const store = mockStore({rows: 5, columns: 6});
    render(<Provider store={store}><PlayScreen store={store} /></Provider>);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(61);
  });

  it('should render the "Seconds left" text', () => {
    render(<Provider store={store}><PlayScreen /></Provider>);
    expect(screen.getByText(/Seconds Left/i)).toBeInTheDocument();
  });

  it('should render the "Pairs Left" text', () => {
    render(<Provider store={store}><PlayScreen /></Provider>);
    expect(screen.getByText(/Pairs Left/i)).toBeInTheDocument();
  });

  it('should render the "Attempts" text', () => {
    render(<Provider store={store}><PlayScreen /></Provider>);
    expect(screen.getByText(/Attempts/i)).toBeInTheDocument();
  });

  it('should render two buttons', () => {
    render(<Provider store={store}><PlayScreen /></Provider>);
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
});