import { randomUUID } from "node:crypto";

export default function PropertiesSkeleton() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
      {Array.from({ length: 4 }, () => (
        <div
          key={randomUUID()}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <div className="relative w-full h-[400px]">
            <div className="w-full h-full bg-gray-200 animate-pulse"></div>
          </div>
          <div className="p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="bg-gray-200 animate-pulse rounded-full size-2 inline-block"></span>
              <div className="bg-gray-200 animate-pulse h-4 w-16 rounded"></div>
            </div>
            <div className="flex justify-between text-xl">
              <div className="bg-gray-200 animate-pulse h-6 w-32 rounded"></div>
              <div className="bg-gray-200 animate-pulse h-6 w-24 rounded"></div>
            </div>
            <div className="bg-gray-200 animate-pulse h-4 w-48 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
