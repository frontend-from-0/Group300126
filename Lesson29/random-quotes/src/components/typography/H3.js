export function H3({ element, children }) {
  switch (element) {
    case 'p':
      return (
        <p className='text-2xl font-semibold text-slate-900'>{children}</p>
      );
    case 'span': 
      return (
        <span className='text-2xl font-semibold text-slate-900'>{children}</span>
      );
    default:
      return (
        <h3 className='text-2xl font-semibold text-slate-900'>{children}</h3>
      );
  }
}
