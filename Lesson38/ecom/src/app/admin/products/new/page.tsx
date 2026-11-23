import type { Metadata } from "next";

import { CreateProductForm } from "./create-product-form";

export const metadata: Metadata = {
  title: "Create product | Admin",
  description: "Add a new product to the store",
};

export default function NewProductPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Create product
        </h1>
        <p className="text-sm text-muted-foreground">
          Save product data with Prisma + MongoDB and upload images to Vercel Blob.
        </p>
      </div>

      <CreateProductForm />
    </main>
  );
}
