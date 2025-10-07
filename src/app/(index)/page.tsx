import { Suspense } from "react";
import Properties from "./components/Properties";
import Filters from "./components/Filters";
import PropertiesSkeleton from "./components/PropertiesSkeleton";

export default async function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Filters />
      <Suspense fallback={<PropertiesSkeleton />}>
        <Properties />
      </Suspense>
    </div>
  );
}
