import { auth0 } from '@/lib/auth0';
import { getQuotes } from './(logged-in)/quotes/action';
import HomeClient from './HomeClient';

// Server Component: reads quotes from MongoDB and the session on the server,
// then passes plain data to the Client Component.
export default async function Home() {
  // const quotes = await getQuotes();
  // const session = await auth0.getSession();
  const [quotes, session] = await Promise.all([
    getQuotes(),
    auth0.getSession(),
  ]);

  return <HomeClient initialQuotes={quotes} userId={session?.user?.sub ?? null} />;
}
