export function QuoteText({ children, className }) {
  return (
    <p className={`font-heading text-2xl leading-snug text-card-foreground ${className ?? ''}`}>
      {children}
    </p>
  );
}