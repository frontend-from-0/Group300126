export function Subtitle({ element, children }) {
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