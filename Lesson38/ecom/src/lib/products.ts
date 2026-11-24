import { parseStorefrontFiltersFromSearchParams } from "@/lib/validation";
import { Currency } from "@/types/currency";
import { type ProductCategory, type ProductSort } from "@/types/product";

export type Product = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  currency: Currency;
  category: ProductCategory;
  stock: number;
  imageUrls: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type GetStorefrontProductsFilters = {
  category?: ProductCategory | "all";
  sort?: ProductSort;
};

export async function getStorefrontProducts(
  _filters: GetStorefrontProductsFilters = {},
): Promise<Product[]> {
  return [];
}

export async function getAllProducts(): Promise<Product[]> {
  return [];
}

export async function getProductById(_id: string): Promise<Product | null> {
  return null;
}

export function parseStorefrontFilters(
  searchParams: Record<string, string | string[] | undefined>,
): { categoryValue: ProductCategory | "all"; sortValue: ProductSort } {
  const { category, sort } =
    parseStorefrontFiltersFromSearchParams(searchParams);

  return { categoryValue: category, sortValue: sort };
}
