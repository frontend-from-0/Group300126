interface SubtitleProps {
  element?: "h2";
  children: React.ReactNode;
}

export function Subtitle({ element, children }: SubtitleProps) {
  switch (element) {
    case 'h2':
      return (
        <h2 className='text-sm text-end text-muted-foreground mt-3'>{children}</h2>
      );
    default:
      return (
        <span className='text-sm block text-end text-muted-foreground mt-3'>
          {children}
        </span>
      );
  }
}