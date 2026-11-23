import { ProductGridSkeleton } from "@/components/storefront/product-grid";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
      <div className="mb-8 space-y-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Skeleton className="h-9 w-full sm:w-52" />
          <Skeleton className="h-9 w-full sm:w-52" />
        </div>
        <ProductGridSkeleton />
      </div>
    </main>
  );
}
