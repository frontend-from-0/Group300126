import { Geist, Geist_Mono } from 'next/font/google';
import { QuotesContextProvider } from '@/contexts/QuotesContextProvider';
import {UserContextProvider} from '@/contexts/UserContextProvider';
import Link from 'next/link';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Quotes App',
  description: 'Simple application that shows motivational quotes',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-screen flex flex-col'>
        <nav className='flex justify-center gap-4 p-4 bg-zinc-900'>
          <Link href="/">Home</Link>
          <Link href="/user/quotes/liked">Liked Quotes Page</Link>
        </nav>
        <QuotesContextProvider>
          <UserContextProvider>{children}</UserContextProvider>
        </QuotesContextProvider>
        <footer className='text-center'>© Random Quotes App</footer>
      </body>
    </html>
  );
}
