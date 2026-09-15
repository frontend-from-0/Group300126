export function Button ({title, handleClick }){
  return (
    <button onClick={handleClick}>{title}</button>
  )
}