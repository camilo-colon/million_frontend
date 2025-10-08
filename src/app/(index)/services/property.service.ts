import type { Property } from "../models/property.model";

export const PropertyService = {
  async getByFilters(req: {
    minPrice?: number;
    maxPrice?: number;
    name?: string;
    address?: string;
  }): Promise<Property[]> {
    const response = await fetch(`http://localhost:5004/api/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    const data = await response.json();
    return data;
  },
};
