'use server';

import { listAllQuotes, seedQuotesIfEmpty } from '@/repositories/quotes';
import { Quote } from '@/types';

// No auth check needed here because we are accessing a public resource
export async function getQuotes(): Promise<Quote[]> {
  return await listAllQuotes();
}


export async function handleLike(quoteId: string) {
  // check current userID
  // call DB method to update like count for the given quote
}