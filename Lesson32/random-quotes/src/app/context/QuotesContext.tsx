'use client';

import { createContext, useState } from 'react';
import { userId } from '@/lib/auth';
import { quotes as initialQuotes, Quote } from '@/quotes';

interface QuotesContextInterface {
  quotes: Quote[];
  index: number;
  handleLike: () => void;
  handleNextClick: () => void;
  handlePrevClick: () => void;
}

const updatedInitialQuotes: Quote[] = initialQuotes.map((quote) => ({
  ...quote,
  likedBy: [],
}));

export const QuotesContext = createContext<QuotesContextInterface>({
  quotes: [],
  index: 0,
  handleLike: () => {},
  handleNextClick: () => {},
  handlePrevClick: () => {},
});

export function QuotesContextProvider({ children }) {
  const [index, setIndex] = useState<number>(0);
  const [quotes, setQuotes] = useState<Quote[]>(updatedInitialQuotes);

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
