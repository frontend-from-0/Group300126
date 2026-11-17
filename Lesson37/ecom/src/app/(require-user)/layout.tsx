import { requireUser } from '@/lib/auth0';


export default async function UserProtectedLayout({ children }: LayoutProps<'/'>) {
  await requireUser();
  
  return (
      <div className='min-h-full flex flex-col'>
        {children}
      </div>

  );
}
