import 'server-only';

import { ObjectId } from 'mongodb';
import { quotesCollection } from '@/lib/db/collections';
import { quotes as seedQuotes } from '@/quotes';
import type { InitialQuote, Quote } from '@/types';
import type { QuoteDocument } from '@/lib/db/quote-document';

function toQuote(document: QuoteDocument): Quote {
  return {
    id: document._id.toHexString(),
    quote: document.quote,
    author: document.author,
    likedBy: document.likedBy ?? [],
    createdBy: document.createdBy,
  };
}

function parseQuoteObjectId(quoteId: string): ObjectId | null {
  if (!ObjectId.isValid(quoteId)) {
    return null;
  }

  return new ObjectId(quoteId);
}

// Fills an empty `quotes` collection with the quotes from src/quotes.ts.
// Safe to call more than once: it does nothing when the collection already has documents.
export async function seedQuotesIfEmpty(
  initialQuotes: InitialQuote[] = seedQuotes,
): Promise<void> {
  const collection = await quotesCollection();

  if ((await collection.countDocuments()) > 0) {
    return;
  }

  await collection.insertMany(
    initialQuotes.map((initialQuote) => ({
      _id: new ObjectId(),
      quote: initialQuote.quote,
      author: initialQuote.author,
      likedBy: [] as string[],
      createdBy: 'seed',
    })),
  );
}

export async function listAllQuotes(): Promise<Quote[]> {
  const collection = await quotesCollection();
  //.sort({ _id: 1 }) - ascending order
  const documents = await collection.find({}).sort({ _id: 1 }).toArray();
  return documents.map(toQuote);
}

export async function listFavouriteQuotes(userId: string): Promise<Quote[]> {
  const collection = await quotesCollection();
  const documents = await collection
    .find({ likedBy: userId })
    .sort({ _id: 1 })
    .toArray();
  return documents.map(toQuote);
}

export async function insertQuote(input: {
  quote: string;
  author: string;
  createdBy: string;
}): Promise<Quote> {
  const collection = await quotesCollection();
  const now = new Date().toISOString();
  const document: QuoteDocument = {
    _id: new ObjectId(),
    quote: input.quote,
    author: input.author,
    likedBy: [],
    createdBy: input.createdBy,
    createdAt: now,
    updatedAt: now,
  };
  await collection.insertOne(document);

  return toQuote(document);
}

export async function updateQuoteLikedBy(
  quoteId: string,
  userId: string,
): Promise<Quote | null> {
  const objectId = parseQuoteObjectId(quoteId);

  if (!objectId) {
    return null;
  }

  const collection = await quotesCollection();
  const existing = await collection.findOne({ _id: objectId });

  if (!existing) {
    return null;
  }

  const alreadyLiked = existing.likedBy.includes(userId);
  const updated = await collection.findOneAndUpdate(
    { _id: objectId },
    alreadyLiked
      ? { $pull: { likedBy: userId } }
      : { $addToSet: { likedBy: userId } },
    { returnDocument: 'after' },
  );

  return updated ? toQuote(updated) : null;
}

export async function deleteQuoteById(quoteId: string): Promise<boolean> {
  const objectId = parseQuoteObjectId(quoteId);

  if (!objectId) {
    return false;
  }

  const collection = await quotesCollection();
  const result = await collection.deleteOne({ _id: objectId });
  return result.deletedCount === 1;
}
