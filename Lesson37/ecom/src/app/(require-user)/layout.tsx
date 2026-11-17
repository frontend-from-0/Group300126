import { requireUser } from '@/lib/auth0';

export default async function LoggedInUserLayout({ children }: LayoutProps<"/">) {
  await requireUser();
  
  return (
    <div>
      {children}
    </div>
  );
}
