'use client';

import { QuoteText } from '@/components/typography/QuoteText';
import { Subtitle } from '@/components/typography/Subtitle';
import { Button } from '@/components/Button';
// I did not change any configurations to make imports work, but I noticed tsconfig file was created in the project (I accidentally named on file .tsx = used typescript) which must have resulted in a conflic between jsconfig and tsconfig and lead to @/ not working.
import { quotes as intialQuotes } from '@/quotes';
import { useState } from 'react';

export default function Home() {
  const [quotes, setQuotes] = useState([...intialQuotes]);
  const [index, setIndex] = useState(0);

  function handleClick() {
    console.log('Current index is', index);
    console.log('Incrementing index....');
    setIndex((prevIndex) => (prevIndex += 1));
  }

  function handleLike() {
    // noop placeholder
  }

  return (
    <main className='flex flex-col items-center justify-center grow'>
      <div className='text-center bg-zinc-800 p-10 rounded-md'>
        <div className='flex justify-end mb-6'>
          <Button title='❤️' handleClick={handleLike} />
        </div>
        <div className='pb-6'>
          <QuoteText className='text-zinc-100'>{quotes[index].quote}</QuoteText>
          <Subtitle>{quotes[index].author}</Subtitle>
        </div>
        <div className='flex justify-center'>
          <Button title='Next quote' handleClick={handleClick} />
        </div>
      </div>
    </main>
  );
}
