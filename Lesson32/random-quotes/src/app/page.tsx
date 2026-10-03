'use client';

import { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { H1 } from '@/components/ui/typography/H1';
import { Small } from '@/components/ui/typography/Small';
import { QuotesContext } from '@/app/context/QuotesContext';
import { HeartBreakIcon, HeartIcon } from '@phosphor-icons/react';
import { userId } from '@/lib/auth';
import { Color, ExampleTypographyComponent } from '@/components/ui/typography/ExampleTypographyComponent';


export default function Home() {
  const { quotes, index, handleLike, handleNextClick, handlePrevClick } =
    useContext(QuotesContext);

  const isLikedQuote = () => quotes[index].likedBy.includes(userId);

  console.log(isLikedQuote());

  return (
    <main className='w-full max-w-3xl mx-auto flex items-center justify-center py-32 px-16 sm:items-start'>
      <div>
        <div className='flex justify-end'>
          <Button onClick={handleLike} variant='ghost'>
            {isLikedQuote() ? (
              <HeartBreakIcon
                weight='fill'
                className='size-8 text-muted-foreground'
              />
            ) : (
              <HeartIcon weight='fill' className='size-8 text-destructive' />
            )}
          </Button>
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

          <ExampleTypographyComponent title={'Some title'} color={Color.Blue} variant={'default'}>
            something!
          </ExampleTypographyComponent>
        </div>
      </div>
    </main>
  );
}
