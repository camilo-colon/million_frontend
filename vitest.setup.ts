import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Mock Next.js fonts
vi.mock("next/font/google", () => ({
  Cairo: () => ({ className: "cairo-font" }),
  Cinzel: () => ({ className: "cinzel-font" }),
  Montserrat: () => ({ className: "montserrat-font" }),
}));

// Mock Next.js Image
vi.mock("next/image", () => ({
  default: () => null,
}));

// Cleanup después de cada test
afterEach(() => {
  cleanup();
});
