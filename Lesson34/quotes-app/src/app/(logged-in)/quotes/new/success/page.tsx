import Link from 'next/link';

export default function  NewQuoteSuccessPage () {
  return (
    <main>
      <div className='max-w-2xl text-center mx-auto'>
        <h1>New quote added successfully!</h1>
        <p>Click <Link href="/quotes/new">here</Link> to add another quote or <Link href={'/'}>return to the main page</Link></p>
      </div>
    </main>
  )
}