interface QuoteTextProps {
  className?: string;
  children: React.ReactNode;
}

export function QuoteText({ className, children }: QuoteTextProps) {
  return (
    <p className={`font-heading text-2xl leading-snug text-card-foreground ${className ?? ''}`}>
      {children}
    </p>
  );
}