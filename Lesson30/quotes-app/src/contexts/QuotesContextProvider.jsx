'use client';

import { createContext, useState } from 'react';
import { quotes as intialQuotes } from '@/quotes';

const updatedQuotes = intialQuotes.map((q, index) => ({ ...q, likedBy: [], id: index }));

export const QuotesContext = createContext([]);

export function QuotesContextProvider({ children }) {
  const [quotes, setQuotes] = useState([...updatedQuotes]);

  function handleLike(currentQuoteIndex, userId) {
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote, index) => {
        if (index !== currentQuoteIndex) {
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

  return (
    <QuotesContext
      value={{
        quotes,
        handleLike,
      }}
    >
      {children}
    </QuotesContext>
  );
}
