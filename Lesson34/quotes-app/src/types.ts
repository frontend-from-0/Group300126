import * as z from 'zod';

export type ID = string | number;

export type UserId = ID;
export type QuoteId = ID;

export interface InitialQuote {
  quote: string;
  author: string;
}

export interface Quote extends InitialQuote {
  id: QuoteId;
  likedBy: UserId[]
}


export interface User {
  userId: UserId;
  likedQuotes: QuoteId[];
}

// Lesson 34 – new quote form (Server Action + Zod)

export interface NewQuoteFormState {
  success: boolean;
  data?: {
    author?: string;
    quote?: string;
  };
  errors?: {
    fieldErrors: {
      author?: string[];
      quote?: string[];
    };
  };
  message?: string;
}

export const NewQuoteSchema = z.object({
  quote: z
    .string()
    .trim()
    .min(3, 'Minimum quote length should be 3 characters.')
    .max(500, 'The quote is too long, try another quote below 500 chars.'),
  author: z
    .string()
    .trim()
    .min(1, 'Minimum author name length is 1 character.')
    .max(50, 'The author is too long, maximum allowed length is 50 chars.'),
});
