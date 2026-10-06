'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { QuoteId, User } from '@/types';

export const userId = 'user-1234';

interface UserContextValue {
  user: User;
  toggleLike: (quoteId: QuoteId) => void;
}

interface UserContextProviderProps {
  children: ReactNode;
}

function applyUserPatch(user: User, patch: Partial<User>): User {
  return { ...user, ...patch };
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User>({
    userId,
    likedQuotes: [],
  });

  function toggleLike(currentQuoteIndex: QuoteId) {
    setUser((prevUser) => {
      const alreadyLiked = prevUser.likedQuotes.includes(currentQuoteIndex);
      if (alreadyLiked) {
        const updatedLikedQuotes = prevUser.likedQuotes.filter(
          (quoteId) => quoteId !== currentQuoteIndex,
        );
        return applyUserPatch(prevUser, {
          likedQuotes: updatedLikedQuotes,
        });
      }

      return applyUserPatch(prevUser, {
        likedQuotes: [...prevUser.likedQuotes, currentQuoteIndex],
      });
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

export function useUser() {
  const value = useContext(UserContext);
  if (!value) {
    throw new Error('useUser must be used within UserContextProvider');
  }
  return value;
}
