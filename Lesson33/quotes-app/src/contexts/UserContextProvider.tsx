'use client';

import { QuoteId, User, UserId } from '@/types';
import { createContext, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

// Fallback id while logged out; when logged in we use the Auth0 user id (sub)
export const userId: UserId = 'anonymous';

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
  const { user: auth0User } = useUser();
  const [user, setUser] = useState({
    userId,
    likedQuotes: [],
  });
  const currentUser = { ...user, userId: auth0User?.sub ?? userId };

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
        user: currentUser,
        toggleLike,
      }}
    >
      {children}
    </UserContext>
  );
}
