import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-xl font-semibold text-foreground">Product not found</h1>
      <p className="text-sm text-muted-foreground">
        The product you are looking for does not exist or was removed.
      </p>
      <Button asChild variant="outline">
        <Link href="/admin/products">Back to products</Link>
      </Button>
    </main>
  );
}
