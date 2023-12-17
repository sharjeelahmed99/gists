import { humanReadableSize } from "./common";

describe("humanReadableSize function", () => {
  test("convert bytes to human-readable format", () => {
    expect(humanReadableSize(1023)).toBe("1023.00 B");
    expect(humanReadableSize(1024 * 1024)).toBe("1.00 MB");
    expect(humanReadableSize(1024 * 1024 * 1024)).toBe("1.00 GB");
    expect(humanReadableSize(1024 * 1024 * 1024 * 1024)).toBe("1.00 TB");
    expect(humanReadableSize(1500)).toBe("1.46 KB");
  });

  test("returns 0 byte for size 0", () => {
    expect(humanReadableSize(0)).toBe("0.00 B");
  });

  test("verify invalid input", () => {});
});
