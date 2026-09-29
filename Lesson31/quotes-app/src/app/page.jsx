'use client';

import { useState, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { H1 } from '@/components/ui/typography/H1';
import { Small } from '@/components/ui/typography/Small';
import { QuotesContext } from '@/contexts/QuotesContextProvider';
import { UserContext } from '@/contexts/UserContextProvider';
import { HeartBreakIcon, HeartIcon } from '@phosphor-icons/react';

export default function Home() {
  const { quotes, handleLike } = useContext(QuotesContext);
  const { user, toggleLike } = useContext(UserContext);

  const [index, setIndex] = useState(0);

  function handleNextClick() {
    setIndex((prevIndex) =>
      prevIndex < quotes.length - 1 ? prevIndex + 1 : prevIndex,
    );
  }

  function handlePrevClick() {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  }

  function handleLikeClick() {
    handleLike(index, user.userId);
    toggleLike(index);
  }

  const isLikedQuote = () => quotes[index]?.likedBy?.includes(user.userId);

  return (
    <main className='w-full max-w-3xl mx-auto flex items-center justify-center grow py-32 px-16'>
      <div>
        <div className='flex justify-end items-center gap-3'>
          <Button onClick={handleLikeClick} variant='ghost'>
            {isLikedQuote() ? (
              <HeartBreakIcon
                weight='fill'
                className='size-8 text-muted-foreground'
              />
            ) : (
              <HeartIcon weight='fill' className='size-8 text-destructive' />
            )}
          </Button>
          <Small>{quotes[index]?.likedBy?.length || 0}</Small>
        </div>

        <H1>{quotes[index].quote}</H1>
        <div className='flex justify-end my-8'>
          <Small>- {quotes[index].author}</Small>
        </div>

        <div className='flex justify-center gap-4'>
          <Button onClick={handlePrevClick} disabled={index === 0} size='lg'>
            Previous quote
          </Button>
          <Button
            onClick={handleNextClick}
            disabled={index === quotes.length - 1}
            size='lg'
          >
            Next quote
          </Button>
        </div>
      </div>
    </main>
  );
}
