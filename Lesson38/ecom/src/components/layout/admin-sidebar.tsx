"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  PackagePlus,
  ShoppingBag,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

const adminLinks = [
  { href: "/admin/products", label: "Products", icon: LayoutGrid },
  { href: "/admin/products/new", label: "Create product", icon: PackagePlus },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/users", label: "Users", icon: Users },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 border-r border-border bg-card md:block">
      <div className="flex h-full flex-col gap-1 p-4">
        <p className="px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Admin
        </p>
        <nav className="flex flex-col gap-1">
          {adminLinks.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href ||
              (href === "/admin/products" &&
                pathname.startsWith("/admin/products/") &&
                !pathname.startsWith("/admin/products/new"));

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
