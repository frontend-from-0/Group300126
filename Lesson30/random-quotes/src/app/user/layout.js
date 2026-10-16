import { UserContext } from '@/app/context/UserContext';
import { userId } from '@/lib/auth';

export const metadata = {
  title: 'Random Quotes App - User pages',
};

export default function UserLayout({ children }) {
  const user = {
    userId: userId,
    username: 'john-doe',
    email: 'john@gmail.com',
  };
  return <UserContext value={{ ...user }}>{children}</UserContext>;
}
