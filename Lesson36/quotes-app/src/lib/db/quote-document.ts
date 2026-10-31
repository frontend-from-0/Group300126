import type { ObjectId } from 'mongodb';

// Shape of a quote as it is stored in MongoDB.
// Only the repository layer uses this type; pages/components use `Quote` from '@/types'.
export interface QuoteDocument {
  _id: ObjectId;
  quote: string;
  author: string;
  likedBy: string[];
  createdBy: string;
  createdAt?: string;
  updatedAt?: string;
}
