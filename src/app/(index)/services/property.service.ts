import { ApiError, NetworkError } from "@/lib/errors";
import type { Property } from "../models/property.model";

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

      if (!response.ok) {
        throw new ApiError(
          `Error al obtener propiedades: ${response.statusText}`,
          response.status,
          "/api/properties",
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Error de red (no conexión)
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new NetworkError(
          "No se pudo conectar con el servidor. Verifica tu conexión.",
        );
      }

      // Re-lanzar errores personalizados
      if (error instanceof ApiError || error instanceof NetworkError) {
        throw error;
      }

      // Error desconocido
      throw new ApiError("Error inesperado al obtener propiedades");
    }
  },
};
