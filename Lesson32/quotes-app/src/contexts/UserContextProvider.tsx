'use client';

import { QuoteId, User, UserId } from '@/types';
import { createContext, useState } from 'react';

export const userId: UserId = 'user-1234';

interface UserContextIterface {
  user: User;
  toggleLike: (currentQuoteIndex: QuoteId) => void;
}

const intialUserContextValue = {
  user: { userId, likedQuotes: [] },
  toggleLike: () => console.log(),
};

export const UserContext = createContext<UserContextIterface>(
  intialUserContextValue,
);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    userId,
    likedQuotes: [],
  });

  function toggleLike(currentQuoteIndex) {
    setUser((prevUser) => {
      const alreadyLiked = prevUser?.likedQuotes.includes(currentQuoteIndex);
      if (alreadyLiked) {
        const updatedLikedQuotes = prevUser?.likedQuotes.filter(
          (quoteId) => quoteId !== currentQuoteIndex,
        );
        return {
          ...prevUser,
          likedQuotes: [...updatedLikedQuotes],
        };
      } else {
        return {
          ...prevUser,
          likedQuotes: [...prevUser?.likedQuotes, currentQuoteIndex],
        };
      }
    });
  }

  return (
    <UserContext
      value={{
        user,
        toggleLike,
      }}
    >
      {children}
    </UserContext>
  );
}
