import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../../App";

describe("quiz flow", () => {
  it("starts quiz and accepts an answer", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /start quiz/i }));
    expect(screen.getByLabelText("conjugation-input")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("conjugation-input"), { target: { value: "test" } });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });
});

