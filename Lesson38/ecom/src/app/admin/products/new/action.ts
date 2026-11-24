'use server';

import { addProduct } from '@/lib/products';
import {
  createProductFormSchema,
  createProductImagesSchema,
} from '@/lib/validation';
import { Category, Currency } from '@/prisma/enums';
import { put } from '@vercel/blob';

export type CreateProductFormValues = {
  name: string;
  description: string;
  price: string;
  currency: Currency;
  category: Category;
  stock: string;
  isActive: boolean;
};

export type CreateProductFieldErrors = Partial<
  Record<keyof CreateProductFormValues | 'images', string>
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
    name: String(formData.get('name') ?? ''),
    description: String(formData.get('description') ?? ''),
    price: String(formData.get('price') ?? ''),
    currency: String(formData.get('currency') ?? '') as Currency,
    category: String(formData.get('category') ?? '') as Category,
    stock: String(formData.get('stock') ?? ''),
    isActive: formData.get('isActive') === 'on',
  };
}

function flattenFieldErrors(
  fieldErrors: Record<string, string[] | undefined>,
): CreateProductFieldErrors {
  return Object.fromEntries(
    Object.entries(fieldErrors).map(([key, messages]) => [key, messages?.[0] ?? '']),
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
      message: 'Please fix the errors below.',
      values,
      fieldErrors: flattenFieldErrors(parsed.error.flatten().fieldErrors),
    };
  }

  const images = formData
    .getAll('images')
    .filter((entry): entry is File => entry instanceof File);
  const imagesParsed = createProductImagesSchema.safeParse(images);
  if (!imagesParsed.success) {
    return {
      success: false,
      message: 'Please fix the errors below.',
      values,
      fieldErrors: {
        images: imagesParsed.error.issues[0]?.message ?? 'Invalid images',
      },
    };
  }

  let imageUrls: string[];
  try {
    imageUrls = await Promise.all(
      images.map(async (image) => {
        // example image name: products/image-name-rand-suffix.jpeg
        const blob = await put(image.name, image, {
          access: 'public',
          addRandomSuffix: true,
        });
        return blob.url;
      }),
    );
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Image upload failed. Please try again.',
      values,
      fieldErrors: { images: 'Could not upload images.' },
    };
  }

  await addProduct({
    name: parsed.data.name,
    description: parsed.data.description,
    priceCents: parseInt(parsed.data.price),
    currency: parsed.data.currency,
    category: parsed.data.category,
    stock: parseInt(parsed.data.stock),
    imageUrls: imageUrls,
    isActive: parsed.data.isActive,
  });

  return {
    success: false,
    message: 'createProduct is not implemented yet.',
  };
}
