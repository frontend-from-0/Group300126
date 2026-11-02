'use client';

import { QuoteText } from '@/components/typography/QuoteText';
import { Subtitle } from '@/components/typography/Subtitle';
import { useState, useContext } from 'react';
import { QuotesContext } from '@/contexts/QuotesContextProvider';
import { Button } from '@/components/ui/button';
import { Card, CardDescription } from '@/components/ui/card';
import { HeartIcon } from '@phosphor-icons/react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { WarningDialog } from '@/components/WarningDialog';

export default function Home() {
  const { quotes, handleLike } = useContext(QuotesContext);
  const { user, isLoading } = useUser();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [index, setIndex] = useState(0);

  function handleClick() {
    console.log('Current index is', index);
    console.log('Incrementing index....');
    setIndex((prevIndex) => (prevIndex += 1));
  }

  function handleLikeClick() {
    if (user) {
      handleLike(index, user.userId);
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
            <QuoteText>{quotes[index].quote}</QuoteText>
            <Subtitle>{quotes[index].author}</Subtitle>
          </div>
          <div className='flex justify-center'>
            <Button onClick={handleClick}>Next quote</Button>
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
