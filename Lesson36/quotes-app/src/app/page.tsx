import { getQuotes } from './action';
import HomePageClient from './HomePageClient';

export default async function Home() {
  const quotes = await getQuotes();

  return (
    <HomePageClient quotes={quotes} />
  );
}
