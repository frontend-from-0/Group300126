import { QuoteText } from '@/components/typography/QuoteText';
import { Button } from '@/components/ui/button';
import { auth0 } from '@/lib/auth0';

export default async function LoggedInLayout({ children }) {
  const session = await auth0.getSession();

  if (session) {
    return <div>{children}</div>;
  } else {
    return (
      <div className='my-10 text-center'>
        <QuoteText>Please log in below to see this page</QuoteText>
        <Button className={'my-6'}>
          <a href='/auth/login'>Log in</a>
        </Button>
      </div>
    );
  }
}
