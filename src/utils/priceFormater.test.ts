import { describe, it, expect } from "vitest";
import { formatPrice } from "./priceFormater";

describe("formatPrice", () => {
  it("should format prices in millions correctly", () => {
    expect(formatPrice(1000000)).toBe("1M");
    expect(formatPrice(2500000)).toBe("3M");
    expect(formatPrice(10000000)).toBe("10M");
  });

  it("should format prices in thousands correctly", () => {
    expect(formatPrice(1000)).toBe("1K");
    expect(formatPrice(5000)).toBe("5K");
    expect(formatPrice(999000)).toBe("999K");
  });

  it("should format prices below 1000 as strings", () => {
    expect(formatPrice(100)).toBe("100");
    expect(formatPrice(500)).toBe("500");
    expect(formatPrice(999)).toBe("999");
  });

  it("should handle edge cases", () => {
    expect(formatPrice(0)).toBe("0");
    expect(formatPrice(1)).toBe("1");
  });

  it("should round millions correctly", () => {
    expect(formatPrice(1400000)).toBe("1M");
    expect(formatPrice(1500000)).toBe("2M");
    expect(formatPrice(1600000)).toBe("2M");
  });

  it("should round thousands correctly", () => {
    expect(formatPrice(1400)).toBe("1K");
    expect(formatPrice(1500)).toBe("2K");
    expect(formatPrice(1600)).toBe("2K");
  });
});
