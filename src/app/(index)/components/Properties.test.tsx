import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Properties from "./Properties";
import { PropertyService } from "../services/property.service";
import type { Property } from "../models/property.model";

// Mock PropertyService
vi.mock("../services/property.service", () => ({
  PropertyService: {
    getByFilters: vi.fn(),
  },
}));

// Mock Next.js Link
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("Properties", () => {
  const mockProperties: Property[] = [
    {
      idOwner: "1",
      name: "Luxury Villa",
      address: "Miami, FL",
      price: 5000000,
      image: "/villa.jpg",
    },
    {
      idOwner: "2",
      name: "Modern Penthouse",
      address: "New York, NY",
      price: 12000000,
      image: "/penthouse.jpg",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render list of properties", async () => {
    vi.mocked(PropertyService.getByFilters).mockResolvedValue(mockProperties);

    const Component = await Properties({ params: {} });
    render(Component);

    expect(screen.getByText("Luxury Villa")).toBeInTheDocument();
    expect(screen.getByText("Modern Penthouse")).toBeInTheDocument();
  });

  it("should call PropertyService with correct filters", async () => {
    vi.mocked(PropertyService.getByFilters).mockResolvedValue(mockProperties);

    const params = {
      minPrice: 1000000,
      maxPrice: 10000000,
      name: "Villa",
      address: "Miami",
    };

    await Properties({ params });

    expect(PropertyService.getByFilters).toHaveBeenCalledWith({
      minPrice: 1000000,
      maxPrice: 10000000,
      name: "Villa",
      address: "Miami",
    });
  });

  it("should render links with correct href", async () => {
    vi.mocked(PropertyService.getByFilters).mockResolvedValue(mockProperties);

    const Component = await Properties({ params: {} });
    render(Component);

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/1");
    expect(links[1]).toHaveAttribute("href", "/2");
  });

  it("should render empty grid when no properties", async () => {
    vi.mocked(PropertyService.getByFilters).mockResolvedValue([]);

    const Component = await Properties({ params: {} });
    const { container } = render(Component);

    const grid = container.querySelector("div");
    expect(grid?.children.length).toBe(0);
  });

  it("should pass all filter params to service", async () => {
    vi.mocked(PropertyService.getByFilters).mockResolvedValue([]);

    const params = {
      minPrice: 2000000,
      maxPrice: 5000000,
    };

    await Properties({ params });

    expect(PropertyService.getByFilters).toHaveBeenCalledWith({
      minPrice: 2000000,
      maxPrice: 5000000,
      name: undefined,
      address: undefined,
    });
  });

  it("should render PropertyCard for each property", async () => {
    vi.mocked(PropertyService.getByFilters).mockResolvedValue(mockProperties);

    const Component = await Properties({ params: {} });
    render(Component);

    // Verify both properties are rendered with their prices
    expect(screen.getByText("Luxury Villa")).toBeInTheDocument();
    expect(screen.getByText("Modern Penthouse")).toBeInTheDocument();
    expect(screen.getByText("Miami, FL")).toBeInTheDocument();
    expect(screen.getByText("New York, NY")).toBeInTheDocument();
  });
});
