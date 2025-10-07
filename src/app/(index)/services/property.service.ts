import { Property } from "../models/property.model";

export const PropertyService = {
  async getByFilters(): Promise<Property[]> {
    const response = await fetch("http://localhost:5004/api/properties");
    const data = await response.json();
    return data;
  },
};
