'use client';

import { createContext, useState } from 'react';

export const userId = 'user-1234';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    userId,
    likedQuotes: [],
  });

  function toggleLike(currentQuoteIndex) {
    setUser((prevUser) => {
      const alreadyLiked = prevUser?.likedQuotes.includes(currentQuoteIndex);
      if (alreadyLiked) {

        const updatedLikedQuotes = prevUser?.likedQuotes.filter(quoteId => quoteId !== currentQuoteIndex);
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
