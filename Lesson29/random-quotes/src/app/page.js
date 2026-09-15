'use client';

import { quotes as initialQuotes } from '@/quotes';
import { Button } from '@/components/Button';
import { useState } from 'react';
import {H3} from '@/components/typography/H3';

export default function Home() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const { quote, author } = initialQuotes[quoteIndex];

  function handleClick() {
    // TODO: Make sure that we get number that's not the same as current index so we always get a different quote after clicking on the next button.
    setQuoteIndex(quoteIndex + 1);
  }

  return (
    // JSX
    <main className='min-h-screen flex items-center justify-center bg-slate-200'>
      <section className='bg-slate-50/50 rounded-md p-10 flex flex-col'>
        <H3 element='p'>{quote}</H3>
        <span className='text-md font-semibold text-slate-900 self-end '>
          - {author}
        </span>
        <div className='mt-6 flex flex-col'>
          <Button variant={'primary'} onClick={handleClick}>
            Next Quote
          </Button>
        </div>
      </section>
    </main>
  );
}
