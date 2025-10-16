import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { PropertyService } from "./property.service";
import type { Property } from "../models/property.model";

describe("PropertyService", () => {
  const mockProperties: Property[] = [
    {
      id: "1",
      idOwner: "1",
      name: "Luxury Villa",
      address: "Miami, FL",
      price: 5000000,
      codeInternal: "LV001",
      year: 2020,
      image: "/villa.jpg",
      images: [
        { id: "img1", file: "/villa1.jpg", enabled: true },
        { id: "img2", file: "/villa2.jpg", enabled: true },
      ],
    },
    {
      id: "2",
      idOwner: "2",
      name: "Penthouse",
      address: "New York, NY",
      price: 12000000,
      codeInternal: "PH001",
      year: 2022,
      image: "/penthouse.jpg",
      images: [
        { id: "img3", file: "/penthouse1.jpg", enabled: true },
      ],
    },
  ];

  beforeEach(() => {
    // Mock fetch global
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getByFilters", () => {
    it("should fetch properties with filters", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProperties,
      } as Response);

      const filters = {
        minPrice: 1000000,
        maxPrice: 10000000,
        name: "Villa",
        address: "Miami",
      };

      const result = await PropertyService.getByFilters(filters);

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:5004/api/properties",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filters),
        },
      );

      expect(result).toEqual(mockProperties);
    });

    it("should fetch properties without filters", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProperties,
      } as Response);

      const result = await PropertyService.getByFilters({});

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:5004/api/properties",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        },
      );

      expect(result).toEqual(mockProperties);
    });

    it("should fetch properties with partial filters", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => [mockProperties[0]],
      } as Response);

      const result = await PropertyService.getByFilters({
        name: "Villa",
      });

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:5004/api/properties",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "Villa" }),
        },
      );

      expect(result).toEqual([mockProperties[0]]);
    });

    it("should return empty array when no properties found", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      } as Response);

      const result = await PropertyService.getByFilters({
        minPrice: 100000000,
      });

      expect(result).toEqual([]);
    });

    it("should handle fetch errors", async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error("Network error"));

      await expect(
        PropertyService.getByFilters({ name: "Test" }),
      ).rejects.toThrow("Network error");
    });

    it("should handle network errors", async () => {
      const fetchError = new TypeError("fetch failed");
      vi.mocked(fetch).mockRejectedValueOnce(fetchError);

      await expect(
        PropertyService.getByFilters({ name: "Test" }),
      ).rejects.toThrow("fetch failed");
    });

    it("should handle API errors with status code", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
        json: async () => ({}),
      } as Response);

      const result = await PropertyService.getByFilters({ name: "Test" });

      expect(result).toEqual({});
    });
  });

  describe("getById", () => {
    it("should fetch a single property by id", async () => {
      const mockProperty = mockProperties[0];

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProperty,
      } as Response);

      const result = await PropertyService.getById("1");

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:5004/api/properties/1",
        {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        },
      );

      expect(result).toEqual(mockProperty);
    });

    it("should fetch property with all images", async () => {
      const mockProperty = mockProperties[0];

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProperty,
      } as Response);

      const result = await PropertyService.getById("1");

      expect(result.images).toHaveLength(2);
      expect(result.images[0]).toEqual({
        id: "img1",
        file: "/villa1.jpg",
        enabled: true,
      });
    });

    it("should handle fetch errors", async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error("Network error"));

      await expect(
        PropertyService.getById("1"),
      ).rejects.toThrow("Network error");
    });

    it("should handle network errors", async () => {
      const fetchError = new TypeError("fetch failed");
      vi.mocked(fetch).mockRejectedValueOnce(fetchError);

      await expect(
        PropertyService.getById("1"),
      ).rejects.toThrow("fetch failed");
    });

    it("should handle API errors with status code", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      } as Response);

      await expect(
        PropertyService.getById("999"),
      ).rejects.toThrow();
    });

    it("should fetch property with empty images array", async () => {
      const mockProperty = {
        ...mockProperties[0],
        images: [],
      };

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProperty,
      } as Response);

      const result = await PropertyService.getById("1");

      expect(result.images).toEqual([]);
    });

    it("should handle different property IDs", async () => {
      const mockProperty = mockProperties[1];

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProperty,
      } as Response);

      const result = await PropertyService.getById("2");

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:5004/api/properties/2",
        expect.any(Object),
      );

      expect(result).toEqual(mockProperty);
      expect(result.id).toBe("2");
    });
  });
});
