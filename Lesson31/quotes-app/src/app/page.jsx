'use client';

import { QuoteText } from '@/components/typography/QuoteText';
import { Subtitle } from '@/components/typography/Subtitle';
import { useState, useContext } from 'react';
import { QuotesContext } from '@/contexts/QuotesContextProvider';
import { UserContext } from '@/contexts/UserContextProvider';
import { Button } from '@/components/ui/button';
import { Card, CardDescription } from '@/components/ui/card';
import {HeartIcon} from '@phosphor-icons/react';

export default function Home() {
  const { quotes, handleLike } = useContext(QuotesContext);
  const { user, toggleLike } = useContext(UserContext);

  const [index, setIndex] = useState(0);

  function handleClick() {
    console.log('Current index is', index);
    console.log('Incrementing index....');
    setIndex((prevIndex) => (prevIndex += 1));
  }

  function handleLikeClick() {
    handleLike(index, user.userId);
    toggleLike(index);
  }

  return (
    <main className='flex flex-col items-center justify-center grow h-dvh'>
      <Card className='mx-auto w-full max-w-xl p-6'>
        <CardDescription>
          <div className='flex justify-end items-center mb-6 gap-3 '>
            <Button variant="ghost" onClick={handleLikeClick}>
              <HeartIcon size={32} />
            </Button>
            <span>{quotes[index]?.likedBy?.length || 0}</span>
          </div>

          <div className='pb-6'>
            <QuoteText className='text-accent-foreground'>
              {quotes[index].quote}
            </QuoteText>
            <Subtitle>{quotes[index].author}</Subtitle>
          </div>
          <div className='flex justify-center'>
            <Button onClick={handleClick}>Next quote</Button>
          </div>
        </CardDescription>
      </Card>
    </main>
  );
}
