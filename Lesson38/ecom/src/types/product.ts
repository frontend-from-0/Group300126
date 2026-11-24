import { Category, Currency } from "@/prisma/enums";

export const PRODUCT_CATEGORY_OPTIONS: {
  value: Category;
  label: string;
}[] = [
  { value: Category.members.ELECTRONICS, label: "Electronics" },
  { value: Category.members.CLOTHING, label: "Clothing" },
  { value: Category.members.HOME, label: "Home" },
  { value: Category.members.SPORTS, label: "Sports" },
  { value: Category.members.OTHER, label: "Other" },
];

export const PRODUCT_CATEGORY_FILTER_OPTIONS: {
  value: Category | "all";
  label: string;
}[] = [
  { value: "all", label: "All categories" },
  ...PRODUCT_CATEGORY_OPTIONS,
];

export function formatCategoryLabel(category: Category): string {
  const option = PRODUCT_CATEGORY_OPTIONS.find((item) => item.value === category);
  return option?.label ?? category;
}

export enum ProductSort {
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
  PRICE_ASC = "price_asc",
  PRICE_DESC = "price_desc",
}

export const PRODUCT_SORT_OPTIONS: {
  value: ProductSort;
  label: string;
}[] = [
  { value: ProductSort.NAME_ASC, label: "Name (A–Z)" },
  { value: ProductSort.NAME_DESC, label: "Name (Z–A)" },
  { value: ProductSort.PRICE_ASC, label: "Price (low to high)" },
  { value: ProductSort.PRICE_DESC, label: "Price (high to low)" },
];

export function isProductSort(value: string): value is ProductSort {
  return Object.values(ProductSort).includes(value as ProductSort);
}

export type Product = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  currency: Currency;
  category: Category;
  stock: number;
  imageUrls: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};