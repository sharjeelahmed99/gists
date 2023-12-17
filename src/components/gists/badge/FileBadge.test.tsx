import { render, screen } from "@testing-library/react";
import FilesBadge from "./FilesBadge";
import * as React from "react";

jest.mock("@/utils", () => ({
  getLanguages: jest.fn(() => ["JavaScript", "HTML"]),
}));

describe("FilesBadge component", () => {
  test("renders the component with badges", () => {
    const files = [
      { name: "file1", language: "JavaScript" },
      { name: "file2", language: "HTML" },
    ];

    render(<FilesBadge files={files} />);

    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("HTML")).toBeInTheDocument();
  });

  test("renders the component with no badges", () => {
    render(<FilesBadge files={{}} />);
    expect(screen.queryByTestId("badge")).toBeNull();
  });
});
