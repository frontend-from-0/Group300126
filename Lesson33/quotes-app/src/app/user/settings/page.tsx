'use client';

import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function UserSettingsPage() {
  const { user, error, isLoading } = useUser();

  if (error) throw Error('Failed loading user');
  if (isLoading) return <p>Loading....</p>;
  if (!user) return <a href='/auth/login'>Please log in</a>;

  return (
    <main className='max-w-xl mx-auto p-6 flex flex-col gap-2'>
      <h1>Settings</h1>
      {user.picture && (
        <Image
          src={user.picture}
          alt={`A profile picture of ${user.email ?? 'user'}`}
          width={50}
          height={50}
        />
      )}
      <span>Name: {user.name}</span>
      <span>Email: {user.email}</span>
    </main>
  );
}
