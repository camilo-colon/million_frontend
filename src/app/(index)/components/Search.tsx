"use client";

import { useFormik } from "formik";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Input } from "@/components/Input";
import { cairo, cinzel } from "@/ui/fonts";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const formik = useFormik({
    initialValues: {
      minPrice: 1000000,
      maxPrice: 18000000,
      name: "",
      address: "",
    },
    onSubmit: (values) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(values).forEach(([key, value]) => {
        if (!value) {
          params.delete(key);
          return;
        }
        params.set(key, value.toString());
      });
      router.push(`${pathname}?${params.toString()}`);
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    formik.setValues((values) => ({
      ...values,
      ...(params.get("minPrice") && {
        minPrice: Number(params.get("minPrice")),
      }),
      ...(params.get("maxPrice") && {
        maxPrice: Number(params.get("maxPrice")),
      }),
      name: params.get("name") || "",
      address: params.get("address") || "",
    }));
  }, [searchParams, formik.setValues]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="h-full flex flex-col gap-4 w-1/5"
    >
      <div className="border-b border-gray-300 flex justify-between items-center py-2">
        <h2 className={`${cinzel.className} text-xl `}>Filters</h2>
        <button type="submit" className="border rounded-lg py-1 px-4">
          Apply
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h4 className={`${cairo.className} text-xl`}>Price Range</h4>
          <div className="flex gap-4">
            <div>
              <label htmlFor="from">From</label>
              <Input
                id="from"
                type="number"
                placeholder="min"
                name="minPrice"
                onChange={formik.handleChange}
                value={formik.values.minPrice}
              />
            </div>
            <div>
              <label htmlFor="to">To</label>
              <Input
                id="to"
                type="number"
                placeholder="max"
                name="maxPrice"
                onChange={formik.handleChange}
                value={formik.values.maxPrice}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className={`${cairo.className} text-xl`} htmlFor="name">
            Name
          </label>
          <Input
            id="name"
            type="text"
            placeholder="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className={`${cairo.className} text-xl`} htmlFor="address">
            Address
          </label>
          <Input
            id="address"
            type="text"
            placeholder="address"
            onChange={formik.handleChange}
            value={formik.values.address}
          />
        </div>
      </div>
    </form>
  );
}
