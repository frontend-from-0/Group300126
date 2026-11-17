import { auth0 } from '@/lib/auth0';

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <div className='flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      {user && <p>{user.name}</p>}
      {user ? (
        <a
          href='/auth/logout'
          className='w-full text-center inline-block px-6 py-3 bg-gradient-to-b from-[#2d2d42] to-[#161620] hover:opacity-90 text-white font-medium rounded-full text-[14px] transition-opacity'
        >
          Logout
        </a>
      ) : (
        <a
          href='/auth/login'
          className='w-full text-center inline-block px-6 py-3 bg-gradient-to-b from-[#2d2d42] to-[#161620] hover:opacity-90 text-white font-medium rounded-full text-[14px] transition-opacity'
        >
          Login
        </a>
      )}
    </div>
  );
}
