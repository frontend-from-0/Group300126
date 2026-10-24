'use client';

import { createContext, useState } from 'react';
import { quotes as intialQuotes } from '@/quotes';
import { QuoteId, Quote, UserId} from '@/types';

const updatedQuotes: Quote[] = intialQuotes.map((q, index) => ({
  ...q,
  likedBy: [],
  id: index,
}));

interface QuotesContextInterface {
  quotes: Quote[];
  handleLike: (currentQuoteIndex: QuoteId, userId: UserId) => void;
}

export const QuotesContext = createContext<QuotesContextInterface>({
  quotes: [],
  handleLike: () => console.log('Handle like is not assigned.'),
});

export function QuotesContextProvider({ children }) {
  const [quotes, setQuotes] = useState<Quote[]>([...updatedQuotes]);

  function handleLike(currentQuoteIndex: QuoteId, userId: UserId) {
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
