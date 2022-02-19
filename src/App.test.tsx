import { render, screen } from "@testing-library/react";
import { App } from "./App";

describe("testing App component", () => {
  test("should render correct", () => {
    render(<App />);

    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });
});
