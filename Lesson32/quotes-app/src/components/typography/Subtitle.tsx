import type { ReactNode } from 'react';
import { SubtitleElement } from '@/types';

interface SubtitleProps {
  element?: SubtitleElement;
  children: ReactNode;
}

export function Subtitle({ element = SubtitleElement.Text, children }: SubtitleProps) {
  switch (element) {
    case SubtitleElement.Heading:
      return (
        <h2 className='text-sm text-end text-muted-foreground mt-3'>{children}</h2>
      );
    case SubtitleElement.Text:
      return (
        <span className='text-sm block text-end text-muted-foreground mt-3'>
          {children}
        </span>
      );
    default: {
      const exhaustiveCheck: never = element;
      return exhaustiveCheck;
    }
  }
}
