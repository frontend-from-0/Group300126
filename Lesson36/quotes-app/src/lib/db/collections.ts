import 'server-only';

import type { Collection } from 'mongodb';
import { getDb } from '@/lib/db/client';
import type { QuoteDocument } from '@/lib/db/quote-document';

export const Collections = {
  quotes: 'quotes',
} as const;

export async function quotesCollection(): Promise<Collection<QuoteDocument>> {
  const db = await getDb();
  return db.collection<QuoteDocument>(Collections.quotes);
}
