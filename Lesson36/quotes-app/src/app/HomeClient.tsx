'use client';

import { QuoteText } from '@/components/typography/QuoteText';
import { Subtitle } from '@/components/typography/Subtitle';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription } from '@/components/ui/card';
import { HeartIcon } from '@phosphor-icons/react';
import { WarningDialog } from '@/components/WarningDialog';
import { Quote } from '@/types';

interface HomeClientProps {
  initialQuotes: Quote[];
  userId: string | null;
}

export default function HomeClient({ initialQuotes, userId }: HomeClientProps) {
  // Quotes now come from MongoDB (loaded on the server in page.tsx)
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [index, setIndex] = useState(0);

  function handleClick() {
    console.log('Current index is', index);
    console.log('Incrementing index....');
    setIndex((prevIndex) => (prevIndex += 1));
  }

  // Likes are still local UI state; saving them to the DB is the next step
  // (repository: updateQuoteLikedBy(quoteId, userId)).
  function handleLike(currentQuoteIndex: number, userId: string) {
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote, quoteIndex) => {
        if (quoteIndex !== currentQuoteIndex) {
          return quote;
        }

        const alreadyLiked = quote.likedBy.includes(userId);

        return {
          ...quote,
          likedBy: alreadyLiked
            ? quote.likedBy.filter((id) => id !== userId)
            : [...quote.likedBy, userId],
        };
      }),
    );
  }

  function handleLikeClick() {
    if (userId) {
      handleLike(index, userId);
    } else {
      setDialogOpen(true);
    }
  }

  return (
    <main className='flex flex-col items-center justify-center grow h-dvh'>
      <Card className='mx-auto w-full max-w-xl p-6'>
        <CardDescription>
          <div className='flex justify-end items-center mb-6 gap-3 '>
            <Button variant='ghost' onClick={handleLikeClick}>
              <HeartIcon size={32} />
            </Button>
            <span>{quotes[index]?.likedBy?.length || 0}</span>
          </div>

          <div className='pb-6'>
            <QuoteText>{quotes[index]?.quote ?? 'No quotes yet.'}</QuoteText>
            <Subtitle>{quotes[index]?.author}</Subtitle>
          </div>
          <div className='flex justify-center'>
            <Button onClick={handleClick} disabled={index >= quotes.length - 1}>
              Next quote
            </Button>
          </div>
        </CardDescription>
      </Card>

      <WarningDialog
        open={dialogOpen}
        title='Please log in to like the quote'
        description={
          <Button variant='link' nativeButton={false} render={<a href='/auth/login' />}>
            Log in
          </Button>
        }
        onClose={() => setDialogOpen(false)}
      />
    </main>
  );
}
