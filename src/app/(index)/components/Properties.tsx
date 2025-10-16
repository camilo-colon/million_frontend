import Link from "next/link";
import PropertyCard from "./PropertyCard";
import { PropertyQuery } from "../models/property.model";
import { PropertyService } from "../services/property.service";

export default async function Properties({
  params,
}: {
  params: PropertyQuery;
}) {
  const { minPrice, maxPrice, name, address } = params;

  // Next.js manejará automáticamente los errores con error.tsx
  const properties = await PropertyService.getByFilters({
    minPrice,
    maxPrice,
    name,
    address,
  });

  // Mostrar mensaje cuando no hay resultados
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No se encontraron propiedades con los filtros seleccionados.
        </p>
        <p className="text-gray-400 mt-2">
          Intenta ajustar tus criterios de búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
      {properties.map((property) => (
        <Link href={`/${property.id}`} key={property.idOwner}>
          <PropertyCard key={property.idOwner} property={property} />
        </Link>
      ))}
    </div>
  );
}
