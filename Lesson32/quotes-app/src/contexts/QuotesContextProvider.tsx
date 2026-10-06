'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { quotes as initialQuotes } from '@/quotes';
import type { QuoteId, StoredQuote, UserId } from '@/types';

interface QuotesContextValue {
  quotes: StoredQuote[];
  handleLike: (quoteId: QuoteId, userId: UserId) => void;
}

interface QuotesContextProviderProps {
  children: ReactNode;
}

function applyQuotePatch(quote: StoredQuote, patch: Partial<StoredQuote>): StoredQuote {
  return { ...quote, ...patch };
}

const updatedQuotes: StoredQuote[] = initialQuotes.map((quote, index) => ({
  ...quote,
  likedBy: [],
  id: index,
}));

const QuotesContext = createContext<QuotesContextValue | null>(null);

export function QuotesContextProvider({ children }: QuotesContextProviderProps) {
  const [quotes, setQuotes] = useState<StoredQuote[]>(updatedQuotes);

  function handleLike(currentQuoteIndex: QuoteId, userId: UserId) {
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote, index) => {
        if (index !== currentQuoteIndex) {
          return quote;
        }

        const alreadyLiked = quote.likedBy.includes(userId);

        return applyQuotePatch(quote, {
          likedBy: alreadyLiked
            ? quote.likedBy.filter((id) => id !== userId)
            : [...quote.likedBy, userId],
        });
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

export function useQuotes() {
  const value = useContext(QuotesContext);
  if (!value) {
    throw new Error('useQuotes must be used within QuotesContextProvider');
  }
  return value;
}
