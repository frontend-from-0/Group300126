import { parseStorefrontFiltersFromSearchParams } from '@/lib/validation';
import { FieldOutputTypes } from '@/prisma/contract';
import { db } from '@/prisma/db';
import { Category } from '@/prisma/enums';
import { Product, type ProductSort } from '@/types/product';

type DbProduct = FieldOutputTypes['__unbound__']['Product'];

export function toAppProduct(product: DbProduct): Product {
  return {
    id: String(product.id),
    name: product.name,
    description: product.description,
    priceCents: product.priceCents,
    currency: product.currency,
    category: product.category,
    stock: product.stock,
    imageUrls: [...product.imageUrls],
    isActive: product.isActive,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

export type GetStorefrontProductsFilters = {
  category?: Category | 'all';
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
): { categoryValue: Category | 'all'; sortValue: ProductSort } {
  const { category, sort } =
    parseStorefrontFiltersFromSearchParams(searchParams);

  return { categoryValue: category, sortValue: sort };
}

export async function addProduct(
  product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<Product | null> {
  const now = new Date();

  const createdProduct = await db.orm.products.create({
    name: product.name,
    description: product.description,
    priceCents: product.priceCents,
    currency: product.currency,
    category: product.category,
    stock: product.stock,
    imageUrls: [],
    isActive: product.isActive,
    createdAt: now,
    updatedAt: now,
  });

  return toAppProduct(createdProduct);
}
