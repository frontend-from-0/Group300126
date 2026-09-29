'use client';

import { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { H1 } from '@/components/ui/typography/H1';
import { Small } from '@/components/ui/typography/Small';
import { QuotesContext } from '@/contexts/QuotesContextProvider';
import { UserContext } from '@/contexts/UserContextProvider';
import { HeartBreakIcon } from '@phosphor-icons/react';
import Link from 'next/link';

export default function LikedQuotes() {
  const { quotes, handleLike } = useContext(QuotesContext);
  const {
    user: { userId },
    toggleLike,
  } = useContext(UserContext);
  const likedQuotes = quotes.filter((quote) => quote.likedBy.includes(userId));

  function handleLikeClick(quoteId) {
    toggleLike(quoteId);
    handleLike(quoteId, userId);
  }

  return (
    <main className='flex flex-col items-center justify-center grow py-10 px-16'>
      <H1>Liked quotes</H1>
      {likedQuotes.length === 0 ? (
        <p className='mt-8 text-muted-foreground'>
          No quotes were liked yet. Check quotes <Link href='/'>here</Link>.
        </p>
      ) : (
        <section className='flex flex-col items-center grow gap-4 my-10 w-full max-w-3xl'>
          {likedQuotes.map((quote) => (
            <div
              className='text-center border border-border p-10 rounded-md w-full'
              key={quote.id}
            >
              <div className='flex justify-end mb-6'>
                <Button
                  variant='ghost'
                  onClick={() => handleLikeClick(quote.id)}
                >
                  <HeartBreakIcon
                    weight='fill'
                    className='size-8 text-muted-foreground'
                  />
                </Button>
              </div>
              <div className='pb-6'>
                <H1>{quote.quote}</H1>
                <div className='flex justify-end mt-4'>
                  <Small>- {quote.author}</Small>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
