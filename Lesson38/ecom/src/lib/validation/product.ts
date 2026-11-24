import { z } from "zod";

import { currencySchema } from "@/lib/validation/currency";
import {
  ACCEPTED_IMAGE_TYPES_SET,
  MAX_IMAGE_BYTES,
  MAX_IMAGE_MB,
} from "@/lib/product-images";
import { ProductCategory } from "@/types/product";
import { priceStringToCents } from "@/types/currency";

const PRICE_PATTERN = /^\d+(\.\d{1,2})?$/;

export const productCategorySchema = z.enum(ProductCategory);

export const createProductFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().min(1, "Description is required"),
  price: z
    .string()
    .trim()
    .min(1, "Price is required")
    .regex(PRICE_PATTERN, "Enter a valid price (e.g. 19.99)"),
  currency: currencySchema,
  category: productCategorySchema,
  stock: z
    .string()
    .trim()
    .min(1, "Stock is required")
    .refine((value) => /^\d+$/.test(value), "Stock must be a whole number")
    .refine((value) => Number(value) >= 0, "Stock cannot be negative"),
  isActive: z.boolean(),
});

export type CreateProductFormInput = z.infer<typeof createProductFormSchema>;

// createProductFormSchema keeps price/stock as strings so we can re-show the user's input on errors.
// createProductDataSchema runs the same validation, then converts to DB types (priceCents, numeric stock).
export const createProductDataSchema = createProductFormSchema.transform(
  (values) => ({
    name: values.name,
    description: values.description,
    priceCents: priceStringToCents(values.price),
    currency: values.currency,
    category: values.category,
    stock: Number(values.stock),
    isActive: values.isActive,
  }),
);

export type CreateProductData = z.infer<typeof createProductDataSchema>;

// Image uploads come from <input type="file"> as File objects in FormData — not strings.
// productImageFileSchema checks one file; createProductImagesSchema wraps it in an array
// and requires at least one image before we upload to Vercel Blob in the server action.
export const productImageFileSchema = z
  .instanceof(File)
  .refine((file) => file.size > 0, "Image file is empty")
  .refine(
    (file) => file.size <= MAX_IMAGE_BYTES,
    `Each image must be ${MAX_IMAGE_MB} MB or smaller`,
  )
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES_SET.has(file.type),
    "Only JPEG, PNG, WebP, and GIF images are allowed",
  );

export const createProductImagesSchema = z
  .array(productImageFileSchema)
  .min(1, "At least one product image is required");
