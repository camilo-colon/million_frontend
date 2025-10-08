"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { cairo, montserrat } from "@/ui/fonts";
import { formatPrice } from "@/utils/priceFormater";

export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searhParams = useSearchParams();

  const minPrice = useMemo(() => {
    const price = searhParams.get("minPrice");
    return price ? `$${formatPrice(Number(price))}` : "$1M";
  }, [searhParams]);

  const maxPrice = useMemo(() => {
    const price = searhParams.get("maxPrice");
    return price ? ` - $${formatPrice(Number(price))}` : " - Any";
  }, [searhParams]);

  const deleteFilters = useCallback(
    (keys: string[]) => {
      const params = new URLSearchParams(searhParams);
      keys.forEach((key) => {
        params.delete(key);
      });
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searhParams],
  );

  return (
    <section className="flex justify-end items-center">
      <div className="hidden lg:flex lg:gap-8">
        <div className="flex gap-2 items-center justify-between text-sm cursor-pointer">
          <h4 className={`${cairo.className} font-semibold`}>Price Range</h4>
          <div className={`${montserrat.className} flex gap-2`}>
            <span>{minPrice}</span>
            <span>{maxPrice}</span>
            {(searhParams.get("minPrice") || searhParams.get("maxPrice")) && (
              <button
                type="button"
                onClick={() => deleteFilters(["minPrice", "maxPrice"])}
              >
                x
              </button>
            )}
          </div>
        </div>
        <div className="flex gap-2 items-center justify-between text-md cursor-pointer">
          <h4 className={`${cairo.className} font-semibold`}>Name</h4>
          <span className={`${montserrat.className}`}>
            {searhParams.get("name") ?? "Any"}
          </span>
          {searhParams.get("name") && (
            <button type="button" onClick={() => deleteFilters(["name"])}>
              x
            </button>
          )}
        </div>
        <div className="flex gap-2 items-center justify-between text-md cursor-pointer">
          <h4 className={`${cairo.className} font-semibold`}>Address</h4>
          <span className={`${montserrat.className}`}>
            {searhParams.get("address") ?? "Any"}
          </span>
          {searhParams.get("address") && (
            <button type="button" onClick={() => deleteFilters(["address"])}>
              x
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
