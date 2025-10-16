import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Property from "./page";
import { PropertyService } from "../services/property.service";
import type { Property as PropertyType } from "../models/property.model";

// Mock del servicio
vi.mock("../services/property.service", () => ({
  PropertyService: {
    getById: vi.fn(),
  },
}));

// Mock de next/link
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock de next/image
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe("Property Page", () => {
  const mockProperty: PropertyType = {
    id: "1",
    idOwner: "owner-1",
    name: "Luxury Villa Miami Beach",
    address: "123 Ocean Drive, Miami Beach, FL 33139",
    price: 5000000,
    codeInternal: "LV001",
    year: 2020,
    image: "/villa-main.jpg",
    images: [
      { id: "img1", file: "/villa1.jpg", enabled: true },
      { id: "img2", file: "/villa2.jpg", enabled: true },
      { id: "img3", file: "/villa3.jpg", enabled: true },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render property details", async () => {
    vi.mocked(PropertyService.getById).mockResolvedValue(mockProperty);

    const params = Promise.resolve({ id: "1" });
    const PropertyPage = await Property({ params });

    render(PropertyPage);

    expect(screen.getByText(mockProperty.name)).toBeInTheDocument();
    expect(screen.getByText(mockProperty.address)).toBeInTheDocument();
  });

  it("should call PropertyService.getById with correct id", async () => {
    vi.mocked(PropertyService.getById).mockResolvedValue(mockProperty);

    const params = Promise.resolve({ id: "1" });
    await Property({ params });

    expect(PropertyService.getById).toHaveBeenCalledWith("1");
    expect(PropertyService.getById).toHaveBeenCalledTimes(1);
  });

  it("should render all property images", async () => {
    vi.mocked(PropertyService.getById).mockResolvedValue(mockProperty);

    const params = Promise.resolve({ id: "1" });
    const PropertyPage = await Property({ params });

    render(PropertyPage);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute("src", "/villa1.jpg");
    expect(images[1]).toHaveAttribute("src", "/villa2.jpg");
    expect(images[2]).toHaveAttribute("src", "/villa3.jpg");
  });

  it("should render back to home link", async () => {
    vi.mocked(PropertyService.getById).mockResolvedValue(mockProperty);

    const params = Promise.resolve({ id: "1" });
    const PropertyPage = await Property({ params });

    render(PropertyPage);

    const backLink = screen.getByText("Back to Home");
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest("a")).toHaveAttribute("href", "/");
  });

  it("should render property with single image", async () => {
    const propertyWithSingleImage: PropertyType = {
      ...mockProperty,
      images: [{ id: "img1", file: "/single.jpg", enabled: true }],
    };

    vi.mocked(PropertyService.getById).mockResolvedValue(propertyWithSingleImage);

    const params = Promise.resolve({ id: "1" });
    const PropertyPage = await Property({ params });

    render(PropertyPage);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAttribute("src", "/single.jpg");
  });

  it("should render property with empty images array", async () => {
    const propertyWithNoImages: PropertyType = {
      ...mockProperty,
      images: [],
    };

    vi.mocked(PropertyService.getById).mockResolvedValue(propertyWithNoImages);

    const params = Promise.resolve({ id: "1" });
    const PropertyPage = await Property({ params });

    render(PropertyPage);

    const images = screen.queryAllByRole("img");
    expect(images).toHaveLength(0);
  });

  it("should render correct image alt text", async () => {
    vi.mocked(PropertyService.getById).mockResolvedValue(mockProperty);

    const params = Promise.resolve({ id: "1" });
    const PropertyPage = await Property({ params });

    render(PropertyPage);

    expect(screen.getByAltText("iamge_img1")).toBeInTheDocument();
    expect(screen.getByAltText("iamge_img2")).toBeInTheDocument();
    expect(screen.getByAltText("iamge_img3")).toBeInTheDocument();
  });

  it("should handle different property IDs", async () => {
    const anotherProperty: PropertyType = {
      id: "2",
      idOwner: "owner-2",
      name: "Penthouse Manhattan",
      address: "456 Park Avenue, New York, NY 10022",
      price: 12000000,
      codeInternal: "PH001",
      year: 2022,
      image: "/penthouse-main.jpg",
      images: [{ id: "img4", file: "/penthouse1.jpg", enabled: true }],
    };

    vi.mocked(PropertyService.getById).mockResolvedValue(anotherProperty);

    const params = Promise.resolve({ id: "2" });
    const PropertyPage = await Property({ params });

    render(PropertyPage);

    expect(PropertyService.getById).toHaveBeenCalledWith("2");
    expect(screen.getByText(anotherProperty.name)).toBeInTheDocument();
    expect(screen.getByText(anotherProperty.address)).toBeInTheDocument();
  });

  it("should apply correct CSS classes to components", async () => {
    vi.mocked(PropertyService.getById).mockResolvedValue(mockProperty);

    const params = Promise.resolve({ id: "1" });
    const PropertyPage = await Property({ params });

    const { container } = render(PropertyPage);

    // Verificar que el contenedor principal tenga las clases correctas
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass("flex", "flex-col", "gap-2");
  });

  it("should render property name with correct font styles", async () => {
    vi.mocked(PropertyService.getById).mockResolvedValue(mockProperty);

    const params = Promise.resolve({ id: "1" });
    const PropertyPage = await Property({ params });

    render(PropertyPage);

    const propertyName = screen.getByText(mockProperty.name);
    expect(propertyName.tagName).toBe("H1");
  });

  it("should render address in address tag", async () => {
    vi.mocked(PropertyService.getById).mockResolvedValue(mockProperty);

    const params = Promise.resolve({ id: "1" });
    const PropertyPage = await Property({ params });

    render(PropertyPage);

    const addressElement = screen.getByText(mockProperty.address);
    expect(addressElement.tagName).toBe("ADDRESS");
  });
});
