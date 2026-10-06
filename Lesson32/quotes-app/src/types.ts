export type QuoteId = number;
export type UserId = string;

export interface Quote {
  quote: string;
  author: string;
}

export interface QuoteMeta {
  id: QuoteId;
  likedBy: UserId[];
}

export type StoredQuote = Quote & QuoteMeta;

export interface User {
  userId: UserId;
  likedQuotes: QuoteId[];
}

export enum AppRoute {
  Home = '/',
  LikedQuotes = '/user/quotes/liked',
}

export enum SubtitleElement {
  Heading = 'h2',
  Text = 'span',
}
