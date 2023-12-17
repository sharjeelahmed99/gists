import * as React from "react";
import { render, screen } from "@testing-library/react";
import Forks from "./Forks";

const mockForks = [
  {
    id: "1",
    user: { login: "test", avatar_url: "avatar1" },
    created_at: new Date("2022-01-01T00:00:00Z"),
    url: "",
    updated_at: new Date("2022-01-01T00:00:00Z"),
  },
];

describe("Forks component", () => {
  beforeAll(() => {
    // mocks which are not available in jsDom. required for AntD Avatar component
    // Todo: define in global

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  test("renders the component with fork details", () => {
    render(<Forks forks={mockForks} />);

    expect(screen.getByText("Oldest Forks")).toBeInTheDocument();

    mockForks.forEach((fork) => {
      expect(screen.getByText(fork.user.login)).toBeInTheDocument();
      expect(screen.getByText("View Fork")).toHaveAttribute(
        "href",
        `https://gist.github.com/${fork.user.login}/${fork.id}`
      );
    });
  });

  test("renders the component and verify datetime format", () => {});
});
