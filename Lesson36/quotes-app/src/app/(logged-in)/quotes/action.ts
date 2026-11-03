'use server';

import { listAllQuotes, seedQuotesIfEmpty } from '@/repositories/quotes';

export async function getQuotes() {
  // First run against an empty database: copy src/quotes.ts into the `quotes` collection.
  await seedQuotesIfEmpty();
  return listAllQuotes();
}

export async function getLikedQuotes() {
  // TODO (next step / homework):
  // 1. check auth and get the userId (auth0.getSession() -> session.user.sub)
  // 2. call the repository: listFavouriteQuotes(userId)
  // 3. return the result
}
