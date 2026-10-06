'use client';

import { QuoteText } from '@/components/typography/QuoteText';
import { Subtitle } from '@/components/typography/Subtitle';
import { Button } from '@/components/ui/button';
import { Card, CardDescription } from '@/components/ui/card';
import { HeartIcon } from '@phosphor-icons/react';
import { useQuotes } from '@/contexts/QuotesContextProvider';
import { useUser } from '@/contexts/UserContextProvider';
import type { QuoteId } from '@/types';

export default function LikedQuotes() {
  const { quotes, handleLike } = useQuotes();
  const {
    user: { userId },
    toggleLike,
  } = useUser();
  const likedQuotes = quotes.filter((quote) => quote.likedBy.includes(userId));

  function handleLikeClick(quoteId: QuoteId) {
    toggleLike(quoteId);
    handleLike(quoteId, userId);
  }

  return (
    <main className='flex flex-col items-center grow py-10 px-6'>
      <h1 className='font-heading text-3xl text-foreground mb-8'>Liked Quotes</h1>
      <section className='flex flex-col items-center gap-5 w-full max-w-xl'>
        {likedQuotes.map((quote) => (
          <Card className='w-full p-6' key={quote.id}>
            <CardDescription>
              <div className='flex justify-end items-center mb-6 gap-2'>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => handleLikeClick(quote.id)}
                >
                  <HeartIcon size={28} weight='fill' />
                </Button>
                <span className='text-muted-foreground'>
                  {quote.likedBy.length || 0}
                </span>
              </div>
              <div>
                <QuoteText className='text-card-foreground'>
                  {quote.quote}
                </QuoteText>
                <Subtitle>{quote.author}</Subtitle>
              </div>
            </CardDescription>
          </Card>
        ))}
      </section>
    </main>
  );
}
