import type { ReactNode } from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import { QuotesContextProvider } from '@/contexts/QuotesContextProvider';
import { UserContextProvider } from '@/contexts/UserContextProvider';
import { TopNavigation } from '@/components/TopNavigation';
import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-sans',
});

const playfairDisplay = Playfair_Display({
	subsets: ['latin'],
	variable: '--font-heading',
});

export const metadata = {
	title: 'Quotes App',
	description: 'Simple application that shows motivational quotes',
};

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html
			lang='en'
			className={`${inter.variable} ${playfairDisplay.variable} h-full antialiased`}
		>
			<body className='min-h-screen bg-background'>
				<header className='p-6'>
					<TopNavigation />
				</header>

				<QuotesContextProvider>
					<UserContextProvider>{children}</UserContextProvider>
				</QuotesContextProvider>
				<footer className='text-center'>© Random Quotes App</footer>
			</body>
		</html>
	);
}
