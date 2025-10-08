import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { PropertyService } from "./property.service";
import type { Property } from "../models/property.model";

describe("PropertyService", () => {
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
      name: "Penthouse",
      address: "New York, NY",
      price: 12000000,
      image: "/penthouse.jpg",
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
  });
});
