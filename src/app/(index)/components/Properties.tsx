import Link from "next/link";
import { PropertyService } from "../services/property.service";
import PropertyCard from "./PropertyCard";

export default async function Properties() {
  const properties = await PropertyService.getByFilters();
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
      {properties.map((property) => (
        <Link href={`/${property.idOwner}`} key={property.idOwner}>
          <PropertyCard key={property.idOwner} property={property} />
        </Link>
      ))}
    </div>
  );
}
