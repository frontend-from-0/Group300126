'use client';

import { createContext, useState } from 'react';
import {userId} from '@/lib/auth';
import {quotes as initialQuotes} from '@/quotes';


const updatedInitialQuotes = initialQuotes.map((quote) => ({
  ...quote,
  likedBy: [],
}));

export const QuotesContext = createContext([]);

export function QuotesContextProvider({children}) {
  const [index, setIndex] = useState(0);
  const [quotes, setQuotes] = useState(updatedInitialQuotes);

  function handleNextClick() {
    if (index < quotes.length - 1) setIndex(index + 1);
  }

  function handlePrevClick() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  function handleLike() {
    setQuotes((prevQuotes) => {
      return prevQuotes.map((quote, elementIndex) => {
        if (elementIndex === index) {
          return {
            ...quote,
            likedBy: [...quote.likedBy, userId],
          };
        }
        return quote;
      });
    });
  }

  return (
    <QuotesContext
      value={{ quotes, index, handleLike, handleNextClick, handlePrevClick }}
    >
      {children}
    </QuotesContext>
  );
}
