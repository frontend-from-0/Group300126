import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "Ecommerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO: make sure only logged in user can access this page
  return (
    <div>{children}</div>
  );
}
