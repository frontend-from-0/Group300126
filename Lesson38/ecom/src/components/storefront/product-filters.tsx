"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  isProductSort,
  PRODUCT_CATEGORY_FILTER_OPTIONS,
  PRODUCT_SORT_OPTIONS,
  type ProductCategory,
  type ProductSort,
} from "@/types/product";

type ProductFiltersProps = {
  category: ProductCategory | "all";
  sort: ProductSort;
};

export function ProductFilters({ category, sort }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilters(next: Partial<ProductFiltersProps>) {
    const params = new URLSearchParams(searchParams.toString());
    const nextCategory = next.category ?? category;
    const nextSort = next.sort ?? sort;

    if (nextCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", nextCategory);
    }

    params.set("sort", nextSort);
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Select
        value={category}
        onValueChange={(value) =>
          updateFilters({ category: value as ProductCategory | "all" })
        }
      >
        <SelectTrigger className="w-full sm:w-52">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {PRODUCT_CATEGORY_FILTER_OPTIONS.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={sort}
        onValueChange={(value) => {
          if (isProductSort(value)) {
            updateFilters({ sort: value });
          }
        }}
      >
        <SelectTrigger className="w-full sm:w-52">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {PRODUCT_SORT_OPTIONS.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
