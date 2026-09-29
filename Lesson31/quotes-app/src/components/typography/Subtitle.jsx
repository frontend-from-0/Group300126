export function Subtitle ({element, children}) {
  switch (element) {
    case 'h2':
      return (
        <h2 className='text-sm text-end'>{children}</h2>
      )
    default:
      return (
        <span className='text-sm block text-end'>{children}</span>
      )
  }
}