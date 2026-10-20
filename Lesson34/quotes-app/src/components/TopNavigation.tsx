import { auth0 } from '@/lib/auth0';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';

// You can user export (named export) or export default (default export) in this component because it is not layout or page file. NextjS requires using default exports in page and layouts.

export async function TopNavigation() {
  const session = await auth0.getSession();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<Link href='/'>Home</Link>}
          />
        </NavigationMenuItem>
        {!!session ? (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link href='/user/quotes/liked'>Liked Quotes</Link>}
              />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link href='/quotes/new'>Add New Quote</Link>}
              />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<a href='/auth/logout'>Log out</a>}
              />
            </NavigationMenuItem>
          </>
        ) : (
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              render={<a href='/auth/login'>Log in</a>}
            />
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

/**
 *
 *
 *
 * https://
 * dev-jm5m0z3xkqxztipx.us.auth0.com
 * /u/login?state=hKFo2SBCREtIM0p4ZEhKWi1kRUhyUnBPZVZjRTJnTkl1eExSYaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIG1CMDBBbVBoSEdZcDVKWHVGYWZybl9Iel9NUDN0NDB1o2NpZNkgYlZmRENLeENGcnhWRWw3QkVsclZ5UWdJUUEzVHRISXQ
 */
