import { Suspense } from "react";

import { ProductFilters } from "@/components/storefront/product-filters";
import { ProductGrid, ProductGridSkeleton } from "@/components/storefront/product-grid";
import { parseStorefrontFilters } from "@/lib/products";
type ProductCatalogProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export function ProductCatalog({ searchParams }: ProductCatalogProps) {
  const { categoryValue, sortValue } = parseStorefrontFilters(searchParams);

  return (
    <div className="space-y-6">
      {/*
        Suspense boundaries keep the catalog responsive while async work finishes.

        1. ProductFilters — client component uses useSearchParams(). Next.js requires
           a Suspense parent so the route can stream: the page shell renders first,
           then the filters hydrate once search params are available.

        2. ProductGrid — async server component awaits Prisma. Without Suspense,
           that fetch would block the entire page response. Wrapping it streams the
           skeleton fallback immediately and swaps in the grid when data is ready.

        The key resets this boundary when category/sort change so users see a fresh
        loading state instead of stale products while the new query runs.
      */}
      <Suspense fallback={<div className="flex gap-3"><div className="h-9 w-52 animate-pulse rounded-lg bg-muted" /><div className="h-9 w-52 animate-pulse rounded-lg bg-muted" /></div>}>
        <ProductFilters category={categoryValue} sort={sortValue} />
      </Suspense>
      <Suspense
        key={`${categoryValue}-${sortValue}`}
        fallback={<ProductGridSkeleton />}
      >
        <ProductGrid category={categoryValue} sort={sortValue} />
      </Suspense>
    </div>
  );
}
