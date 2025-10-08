import Link from "next/link";
import type { PropertyQuery } from "../models/property.model";
import { PropertyService } from "../services/property.service";
import PropertyCard from "./PropertyCard";

export default async function Properties({
  params,
}: {
  params: PropertyQuery;
}) {
  const { minPrice, maxPrice, name, address } = params;
  const properties = await PropertyService.getByFilters({
    minPrice,
    maxPrice,
    name,
    address,
  });
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
      {properties.map((property) => (
        <Link href={`/${property.idOwner}`} key={property.idOwner}>
          <PropertyCard key={property.idOwner} property={property} />
        </Link>
      ))}
    </div>
  );
}
