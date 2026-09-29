'use client';

import { QuoteText } from '@/components/typography/QuoteText';
import { Subtitle } from '@/components/typography/Subtitle';
import { Button } from '@/components/Button';
import { useState, useContext } from 'react';
import {QuotesContext} from '@/contexts/QuotesContextProvider';
import {UserContext} from '@/contexts/UserContextProvider';

export default function Home() {
  const {quotes, handleLike} = useContext(QuotesContext);
  const { user, toggleLike } = useContext(UserContext);

  const [index, setIndex] = useState(0);

  function handleClick() {
    console.log('Current index is', index);
    console.log('Incrementing index....');
    setIndex((prevIndex) => (prevIndex += 1));
  }

  function handleLikeClick(){
    handleLike(index, user.userId);
    toggleLike(index);
  }

  return (
    <main className='flex flex-col items-center justify-center grow'>
      <div className='text-center bg-zinc-800 p-10 rounded-md'>
        <div className='flex justify-end mb-6 gap-3'>
          <Button title='❤️' onClick={handleLikeClick} />
          <span>{quotes[index]?.likedBy?.length || 0}</span>
        </div>
        <div className='pb-6'>
          <QuoteText className='text-zinc-100'>{quotes[index].quote}</QuoteText>
          <Subtitle>{quotes[index].author}</Subtitle>
        </div>
        <div className='flex justify-center'>
          <Button title='Next quote' onClick={handleClick} />
        </div>
      </div>
    </main>
  );
}
