import { Property } from "../models/property.model";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5004";

export const PropertyService = {
  async getByFilters(req: {
    minPrice?: number;
    maxPrice?: number;
    name?: string;
    address?: string;
  }): Promise<Property[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  async getById(id: string): Promise<Property> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/properties/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
};
