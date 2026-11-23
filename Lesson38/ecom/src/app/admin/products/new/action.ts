"use server";

import {
  createProductFormSchema,
  createProductImagesSchema,
} from "@/lib/validation";
import { Currency } from "@/types/currency";
import { ProductCategory } from "@/types/product";

export type CreateProductFormValues = {
  name: string;
  description: string;
  price: string;
  currency: Currency;
  category: ProductCategory;
  stock: string;
  isActive: boolean;
};

export type CreateProductFieldErrors = Partial<
  Record<keyof CreateProductFormValues | "images", string>
>;

export type CreateProductState =
  | { success: true; productId: string }
  | {
      success: false;
      message: string;
      values?: CreateProductFormValues;
      fieldErrors?: CreateProductFieldErrors;
    };

function parseFormValues(formData: FormData): CreateProductFormValues {
  return {
    name: String(formData.get("name") ?? ""),
    description: String(formData.get("description") ?? ""),
    price: String(formData.get("price") ?? ""),
    currency: String(formData.get("currency") ?? "") as Currency,
    category: String(formData.get("category") ?? "") as ProductCategory,
    stock: String(formData.get("stock") ?? ""),
    isActive: formData.get("isActive") === "on",
  };
}

function flattenFieldErrors(
  fieldErrors: Record<string, string[] | undefined>,
): CreateProductFieldErrors {
  return Object.fromEntries(
    Object.entries(fieldErrors).map(([key, messages]) => [key, messages?.[0] ?? ""]),
  ) as CreateProductFieldErrors;
}

export async function createProduct(
  _prevState: CreateProductState | null,
  formData: FormData,
): Promise<CreateProductState> {
  const values = parseFormValues(formData);

  const parsed = createProductFormSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      values,
      fieldErrors: flattenFieldErrors(parsed.error.flatten().fieldErrors),
    };
  }

  const images = formData
    .getAll("images")
    .filter((entry): entry is File => entry instanceof File);
  const imagesParsed = createProductImagesSchema.safeParse(images);
  if (!imagesParsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      values,
      fieldErrors: {
        images: imagesParsed.error.issues[0]?.message ?? "Invalid images",
      },
    };
  }

  // TODO: Implement the logic to save product data to the database and upload images to Vercel Blob

  return {
    success: false,
    message: "createProduct is not implemented yet.",
  };
}
