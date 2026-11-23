'use server';

import { parseStorefrontFiltersFromSearchParams } from "@/lib/validation";
import type { FieldOutputTypes } from "@/prisma/contract";
import { db } from "@/prisma/db";
import { Currency } from "@/types/currency";
import {
  Product,
  type ProductCategory,
  type ProductSort,
} from "@/types/product";

type DbProduct = FieldOutputTypes["__unbound__"]["Product"];

export function toAppProduct(product: DbProduct): Product {
  return {
    id: String(product._id),
    name: product.name,
    description: product.description,
    priceCents: product.priceCents,
    currency: product.currency as Currency,
    category: product.category as ProductCategory,
    stock: product.stock,
    imageUrls: product.imageUrls,
    isActive: product.isActive,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

export type GetStorefrontProductsFilters = {
  category?: ProductCategory | "all";
  sort?: ProductSort;
};

export async function getStorefrontProducts(
  _filters: GetStorefrontProductsFilters = {},
): Promise<Product[]> {
  const products = await db.orm.products.all();
  return products.map(toAppProduct);
}

export async function getAllProducts(): Promise<Product[]> {
  return [];
}

export async function getProductById(_id: string): Promise<Product | null> {
  return null;
}

export async function parseStorefrontFilters(
  searchParams: Record<string, string | string[] | undefined>,
): Promise<{ categoryValue: ProductCategory | "all"; sortValue: ProductSort }> {
  const { category, sort } =
    parseStorefrontFiltersFromSearchParams(searchParams);

  return { categoryValue: category, sortValue: sort };
}

export async function addProduct(
  product: Omit<Product, "id" | "createdAt" | "updatedAt">,
): Promise<Product | null> {
  const now = new Date();
  const createdProduct = await db.orm.products.create({
    name: product.name,
    description: product.description,
    priceCents: product.priceCents,
    currency: product.currency,
    category: product.category,
    stock: product.stock,
    imageUrls: product.imageUrls,
    isActive: product.isActive,
    createdAt: now,
    updatedAt: now,
  });

  return toAppProduct(createdProduct);
}
