import type { ReactNode } from 'react';

interface QuoteTextProps {
  children: ReactNode;
  className?: string;
}

export function QuoteText({ children, className }: QuoteTextProps) {
  return (
    <p className={`font-heading text-2xl leading-snug text-card-foreground ${className ?? ''}`}>
      {children}
    </p>
  );
}
