"use client";

import { cairo, cinzel, montserrat } from "@/ui/fonts";

export default function Filters() {
  return (
    <section className="flex justify-between items-center">
      <button className={`${cinzel.className} text-xl`}>
        <span>Filters</span>
      </button>
      <div className="hidden lg:flex lg:gap-8">
        <div
          role="button"
          className="flex gap-2 items-center justify-between text-md cursor-pointer"
        >
          <span className={`${cairo.className} font-semibold`}>
            Price Range
          </span>
          <span className={`${montserrat.className}`}>1M - Any</span>
        </div>
        <div
          role="button"
          className="flex gap-2 items-center justify-between text-md cursor-pointer"
        >
          <span className={`${cairo.className} font-semibold`}>Name</span>
          <span className={`${montserrat.className}`}>5940 Bay RD</span>
        </div>
        <div
          role="button"
          className="flex gap-2 items-center justify-between text-md cursor-pointer"
        >
          <span className={`${cairo.className} font-semibold`}>Address</span>
          <span className={`${montserrat.className}`}>Miami Beach</span>
        </div>
      </div>
    </section>
  );
}
