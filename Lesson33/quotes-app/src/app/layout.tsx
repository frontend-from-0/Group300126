import { Inter, Playfair_Display } from 'next/font/google';
import { QuotesContextProvider } from '@/contexts/QuotesContextProvider';
import { UserContextProvider } from '@/contexts/UserContextProvider';
import { TopNavigation } from '@/components/TopNavigation';
import { Button } from '@/components/ui/button';
import { auth0 } from '@/lib/auth0';
import './globals.css';

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

export default async function RootLayout({ children }) {
	// Server side: read the Auth0 session cookie (null when logged out)
	const session = await auth0.getSession();

	return (
		<html
			lang='en'
			className={`${inter.variable} ${playfairDisplay.variable} h-full antialiased`}
		>
			<body className='min-h-screen bg-background'>
				<header className='p-6 flex justify-between items-center'>
					<TopNavigation isLoggedIn={!!session} />
					{session ? (
						<div className='flex gap-3 items-center'>
							<span>{session.user.name}</span>
							<Button nativeButton={false} render={<a href='/auth/logout'>Logout</a>} />
						</div>
					) : (
						<Button nativeButton={false} render={<a href='/auth/login'>Login</a>} />
					)}
				</header>

				<QuotesContextProvider>
					<UserContextProvider>{children}</UserContextProvider>
				</QuotesContextProvider>
				<footer className='text-center'>© Random Quotes App</footer>
			</body>
		</html>
	);
}
