import z from 'zod';

export type ID = string | number;

export type UserId = ID;
export type QuoteId = ID;

export interface InitialQuote {
  quote: string;
  author: string;
}

export interface Quote extends InitialQuote {
  id: QuoteId;
  likedBy: UserId[];
}

export interface User {
  userId: UserId;
  likedQuotes: QuoteId[];
}

export interface NewQuoteFormState {
  success: boolean;
  data?: Partial<InitialQuote>;
  errors?: {
    quote?: string[];
    author?: string[];
  };
  message?: string;
}

export const quoteSchema = z.object({
  quote: z
    .string()
    .trim()
    .min(3, 'Quote should be at least 3 characters long.')
    .max(500, 'Quote should be at most 500 characters long.'),
  author: z
    .string()
    .trim()
    .min(1, 'Author should be at least 1 characters long.')
    .max(50, 'Author should be at most 50 characters long.'),
});
