import { Suspense } from "react";
import Properties from "./components/Properties";
import Filters from "./components/Filters";

export default async function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Filters />
      <Suspense fallback={<div>Loading...</div>}>
        <Properties />
      </Suspense>
    </div>
  );
}
