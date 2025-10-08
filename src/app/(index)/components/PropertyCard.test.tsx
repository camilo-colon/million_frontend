import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PropertyCard from "./PropertyCard";
import type { Property } from "../models/property.model";

describe("PropertyCard", () => {
  const mockProperty: Property = {
    idOwner: "1",
    name: "Luxury Villa",
    address: "123 Ocean Drive, Miami, FL",
    price: 5000000,
    image: "/test-image.jpg",
  };

  it("should render property information correctly", () => {
    render(<PropertyCard property={mockProperty} />);

    expect(screen.getByText("Luxury Villa")).toBeInTheDocument();
    expect(screen.getByText("123 Ocean Drive, Miami, FL")).toBeInTheDocument();
    expect(screen.getByText("For Sale")).toBeInTheDocument();
  });

  it("should have proper structure", () => {
    render(<PropertyCard property={mockProperty} />);

    // Verify the card renders with key information
    expect(screen.getByText("Luxury Villa")).toBeInTheDocument();
    expect(screen.getByText("For Sale")).toBeInTheDocument();
  });

  it("should format price correctly", () => {
    render(<PropertyCard property={mockProperty} />);

    expect(screen.getByText("$5,000,000")).toBeInTheDocument();
  });

  it("should display 'For Sale' status indicator", () => {
    render(<PropertyCard property={mockProperty} />);

    const statusIndicator = screen.getByText("For Sale");
    expect(statusIndicator).toBeInTheDocument();
  });

  it("should render with different property data", () => {
    const differentProperty: Property = {
      idOwner: "2",
      name: "Modern Penthouse",
      address: "456 Park Avenue, New York, NY",
      price: 12000000,
      image: "/penthouse.jpg",
    };

    render(<PropertyCard property={differentProperty} />);

    expect(screen.getByText("Modern Penthouse")).toBeInTheDocument();
    expect(screen.getByText("456 Park Avenue, New York, NY")).toBeInTheDocument();
    expect(screen.getByText("$12,000,000")).toBeInTheDocument();
  });
});
