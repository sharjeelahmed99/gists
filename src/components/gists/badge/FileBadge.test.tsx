import { render, screen } from "@testing-library/react";
import FilesBadge from "./FilesBadge";
import * as React from "react";

jest.mock("@/utils", () => ({
  getLanguages: jest.fn(() => ["JavaScript", "HTML"]),
}));

describe("FilesBadge component", () => {
  test("renders the component with badges", () => {
    const files = {
      file1: { filename: "file1", type: "", size: 0, language: "JavaScript" },
      file2: { filename: "file2", type: "", size: 0, language: "HTML" },
    };

    render(<FilesBadge files={files} />);

    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("HTML")).toBeInTheDocument();
  });

  test("renders the component with no badges", () => {
    render(<FilesBadge files={{}} />);
    expect(screen.queryByTestId("badge")).toBeNull();
  });
});
