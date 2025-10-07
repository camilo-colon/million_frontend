import { cairo, cinzel } from "@/ui/fonts";
import { Property } from "../models/property.model";
import Image from "next/image";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="relative w-full h-[400px]">
        <Image
          src={property.image}
          fill
          priority={true}
          sizes="100%"
          className="object-cover"
          alt="Property Image"
        />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="bg-[#2fc749] rounded-full size-2 inline-block"></span>
          <span className={`${cairo.className}`}>For Sale</span>
        </div>
        <div className="flex justify-between text-xl">
          <h2 className={`${cinzel.className}`}>{property.name}</h2>
          <p className={`${cairo.className} font-semibold`}>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            }).format(property.price)}
          </p>
        </div>
        <p className="text-gray-600">{property.address}</p>
      </div>
    </div>
  );
}
