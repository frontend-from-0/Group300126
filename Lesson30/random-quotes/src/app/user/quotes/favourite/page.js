'use client';

import { userId } from '@/lib/auth';
import { useContext } from 'react';
import { QuotesContext } from '@/app/context/QuotesContext';
import Link from 'next/link';

export default function FavouriteQuotesPage() {
  const { quotes } = useContext(QuotesContext);

  const likedQuotes = quotes.filter((quote) => quote.likedBy.includes(userId));

  return (
    <main className='flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start'>
      {likedQuotes.map((quote) => (
        <div key={quote.quote}>
          <p>{quote.quote}</p>
          <span>- {quote.author}</span>
        </div>
      ))}

      {likedQuotes.length === 0 ? (
        <h1>
          No quotes were liked yet. Check quotes <Link href='/'>here</Link>
        </h1>
      ) : (
        <></>
      )}
    </main>
  );
}
