import * as React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Listing } from "./Listing";
import { getGistsByUsername } from "@/api";
import { PAGINATION } from "@/constants";

jest.mock("@/api");
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));
const mockGists = [
  {
    id: "1",
    description: "Test Gist",
    files: { file1: { filename: "test.js" } },
  },
];

describe("Listing component", () => {
  beforeAll(() => {
    // mocks which are not available in jsDom. required for AntD component
    //Todo: define in global

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
    (getGistsByUsername as jest.Mock).mockResolvedValue({
      data: mockGists,
      headers: { link: "" },
    });
  });
  test("render the listing component", async () => {
    render(<Listing />);
    expect(screen.getByText("Welcome on Gists Finder!")).toBeInTheDocument();
    expect(screen.getByText("Search by user")).toBeInTheDocument();
  });

  test("handles user input and fetches gists", async () => {
    render(<Listing />);

    const usernameInput = screen.getByPlaceholderText("username");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });

    await waitFor(() => {
      expect(getGistsByUsername).toHaveBeenCalledWith("testuser", {
        page: 1,
        per_page: PAGINATION.PAGE_SIZE,
      });
      expect(screen.getByText("Test Gist")).toBeInTheDocument();
      expect(screen.getByText("test.js")).toBeInTheDocument();
    });
  });

  test("verify  gist API error", async () => {
    (getGistsByUsername as jest.Mock).mockRejectedValueOnce(
      new Error("API Error")
    );
    render(<Listing />);
  });

  test("navigates to gist details on row click", async () => {});

  test("verify empty list when with empty seach text ", async () => {});

  test("verify all the required columns are present ", async () => {});
  test("verify rendering of badge component ", async () => {});

  test("verify pagination total count", async () => {});

  test("verify pagination with page 0 and page_size 10", async () => {});

  test("verify pagination next and back pages", async () => {});
});
