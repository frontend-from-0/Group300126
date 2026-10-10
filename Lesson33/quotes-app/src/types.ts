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
