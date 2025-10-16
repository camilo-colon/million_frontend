import Link from "next/link";
import { PropertyService } from "../services/property.service";
import Image from "next/image";

export default async function Property({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await PropertyService.getById(id);
  return (
    <div className="flex flex-col gap-2">
      <Link href={"/"} className="text-blue-500 hover:text-blue-700">
        Back to Home
      </Link>
      <div className="flex flex-col">
        <address className="font-[]">{property.address}</address>
        <h1 className="font-[Cinzel] font-bold text-xl lg:text-2xl">
          {property.name}
        </h1>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
        {property.images.map((image) => (
          <div key={image.id} className="w-full h-[400px] relative">
            <Image
              src={image.file}
              fill
              sizes="100%"
              objectFit="cover"
              alt={`iamge_${image.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
