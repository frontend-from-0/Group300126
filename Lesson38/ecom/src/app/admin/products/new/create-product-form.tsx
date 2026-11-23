"use client";

import { useActionState, type ReactNode } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ACCEPTED_IMAGE_ACCEPT_ATTR, MAX_IMAGE_MB } from "@/lib/product-images";
import { Currency, EU_CURRENCY_OPTIONS } from "@/types/currency";
import { PRODUCT_CATEGORY_OPTIONS, ProductCategory } from "@/types/product";
import { createProduct, CreateProductFieldErrors, CreateProductFormValues, CreateProductState } from "./action";

const initialValues: CreateProductFormValues = {
  name: "",
  description: "",
  price: "",
  currency: Currency.EUR,
  category: ProductCategory.OTHER,
  stock: "0",
  isActive: true,
};

function fieldError(
  fieldErrors: CreateProductFieldErrors | undefined,
  field: keyof CreateProductFieldErrors,
) {
  return fieldErrors?.[field];
}

export function CreateProductForm() {
  const [state, formAction, isPending] = useActionState<
    CreateProductState | null,
    FormData
  >(createProduct, null);

  const values = state && !state.success ? (state.values ?? initialValues) : initialValues;
  const fieldErrors = state && !state.success ? state.fieldErrors : undefined;
  const formKey =
    state && !state.success && state.values
      ? `retry-${state.values.name}-${state.values.price}-${state.values.stock}`
      : "create-product";

  if (state?.success) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">Product created</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The product was saved to MongoDB and images were uploaded to Vercel Blob.
        </p>
        <p className="mt-4 text-sm">
          Product ID:{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{state.productId}</code>
        </p>
        <div className="mt-6 flex gap-3">
          <Button asChild>
            <Link href="/admin/products/new">Create another product</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/products">View all products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      key={formKey}
      action={formAction}
      className="space-y-8"
      encType="multipart/form-data"
    >
      {state && !state.success ? (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {state.message}
        </div>
      ) : null}

      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">Basic details</h2>
          <p className="text-sm text-muted-foreground">
            Core product information stored in the <code>products</code> collection.
          </p>
        </div>

        <div className="grid gap-4">
          <FormField
            id="name"
            label="Name"
            error={fieldError(fieldErrors, "name")}
          >
            <Input
              id="name"
              name="name"
              defaultValue={values.name}
              placeholder="Running shoes"
              required
              aria-invalid={Boolean(fieldError(fieldErrors, "name"))}
            />
          </FormField>

          <FormField
            id="description"
            label="Description"
            error={fieldError(fieldErrors, "description")}
          >
            <Textarea
              id="description"
              name="description"
              defaultValue={values.description}
              placeholder="Lightweight trainers for everyday runs."
              required
              aria-invalid={Boolean(fieldError(fieldErrors, "description"))}
            />
          </FormField>

          <FormField
            id="category"
            label="Category"
            error={fieldError(fieldErrors, "category")}
          >
            <select
              id="category"
              name="category"
              defaultValue={values.category}
              className={cn(
                "h-9 w-full rounded-lg border border-input bg-input/30 px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
                fieldError(fieldErrors, "category") && "border-destructive",
              )}
              required
              aria-invalid={Boolean(fieldError(fieldErrors, "category"))}
            >
              {PRODUCT_CATEGORY_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </FormField>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">Pricing & inventory</h2>
          <p className="text-sm text-muted-foreground">
            Price is entered in major units and stored as <code>priceCents</code> in the database.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <FormField
            id="price"
            label="Price"
            error={fieldError(fieldErrors, "price")}
            className="sm:col-span-1"
          >
            <Input
              id="price"
              name="price"
              type="text"
              inputMode="decimal"
              defaultValue={values.price}
              placeholder="19.99"
              required
              aria-invalid={Boolean(fieldError(fieldErrors, "price"))}
            />
          </FormField>

          <FormField
            id="currency"
            label="Currency"
            error={fieldError(fieldErrors, "currency")}
            className="sm:col-span-1"
          >
            <select
              id="currency"
              name="currency"
              defaultValue={values.currency}
              className={cn(
                "h-9 w-full rounded-lg border border-input bg-input/30 px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
                fieldError(fieldErrors, "currency") && "border-destructive",
              )}
              required
              aria-invalid={Boolean(fieldError(fieldErrors, "currency"))}
            >
              {EU_CURRENCY_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            id="stock"
            label="Stock"
            error={fieldError(fieldErrors, "stock")}
            className="sm:col-span-1"
          >
            <Input
              id="stock"
              name="stock"
              type="number"
              min={0}
              step={1}
              defaultValue={values.stock}
              required
              aria-invalid={Boolean(fieldError(fieldErrors, "stock"))}
            />
          </FormField>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">Images</h2>
          <p className="text-sm text-muted-foreground">
            Files are uploaded to Vercel Blob; only the returned URLs are saved on
            the product. Max {MAX_IMAGE_MB} MB per image.
          </p>
        </div>

        <FormField
          id="images"
          label="Product images"
          error={fieldError(fieldErrors, "images")}
        >
          <Input
            id="images"
            name="images"
            type="file"
            accept={ACCEPTED_IMAGE_ACCEPT_ATTR}
            multiple
            required
            aria-invalid={Boolean(fieldError(fieldErrors, "images"))}
          />
        </FormField>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">Visibility</h2>
          <p className="text-sm text-muted-foreground">
            Inactive products stay in the database but can be hidden from the storefront later.
          </p>
        </div>

        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={values.isActive}
            className="size-4 rounded border border-input accent-primary"
          />
          <span>Product is active and visible in the store</span>
        </label>
      </section>

      <div className="flex items-center gap-3 border-t border-border pt-6">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating product..." : "Create product"}
        </Button>
        <Button asChild variant="outline" disabled={isPending}>
          <Link href="/admin/products">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}

function FormField({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
