import { Suspense } from "react";
import Filters from "./components/Filters";
import Properties from "./components/Properties";
import PropertiesSkeleton from "./components/PropertiesSkeleton";
import Search from "./components/Search";
import type { PropertyQuery } from "./models/property.model";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<PropertyQuery>;
}) {
  const params = await searchParams;
  return (
    <div className="flex gap-4">
      <Search />
      <div className="flex-grow flex flex-col gap-4">
        <Filters />
        <Suspense fallback={<PropertiesSkeleton />}>
          <Properties params={params} />
        </Suspense>
      </div>
    </div>
  );
}
