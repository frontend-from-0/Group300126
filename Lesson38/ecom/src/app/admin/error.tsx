"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

type AdminErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AdminErrorPage({ error, reset }: AdminErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
      <h2 className="text-lg font-semibold text-foreground">Admin error</h2>
      <p className="max-w-md text-sm text-muted-foreground">
        Something went wrong in the admin area.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
