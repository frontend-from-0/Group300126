import { requireAdmin } from '@/lib/auth0';

export default async function AdminLayout({ children }: LayoutProps<"/">) {
  await requireAdmin();
  
  return (
    <div>
      {children}
    </div>
  );
}
