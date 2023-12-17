import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Details from "./Details";
import { getGistById } from "@/api";

jest.mock("@/api");

const mockGistId = "123";
const mockGistDetails = {
  forks: [
    {
      id: "fork1",
      created_at: "2022-01-01T00:00:00Z",
      user: { login: "user1", avatar_url: "avatar1" },
    },
  ],
  files: {
    testFile: { filename: "testFile", language: "JavaScript", size: 1024 },
  },
};

describe("Details component", () => {
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
  beforeEach(() => {
    (getGistById as jest.Mock).mockResolvedValue({ data: mockGistDetails });
  });

  test("renders component with gist details", async () => {
    render(<Details gistId={mockGistId} />);

    await waitFor(() => {
      expect(screen.getByText("Gist Detail")).toBeInTheDocument();
      expect(screen.getByText("Forks")).toBeInTheDocument();
      expect(screen.getByText("Badge")).toBeInTheDocument();
    });
    const elements = screen.findAllByText(/JavaScript/);
    expect(elements).resolves.toHaveLength(2);
  });

  test("verify redirect on a fork to its details", async () => {
    render(<Details gistId={mockGistId} />);

    await waitFor(() => {
      expect(screen.getByText("Gist Detail")).toBeInTheDocument();
    });
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `https://gist.github.com/${mockGistDetails.forks[0].user.login}/${mockGistDetails.forks[0].id}`
    );
  });

  test("verify get gists api error", async () => {});

  test("verify badge with filetype if language is not available", async () => {});
});
