import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { AppRoute } from '@/types';

// You can user export (named export) or export default (default export) in this component because it is not layout or page file. NextjS requires using default exports in page and layouts.

export function TopNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<Link href={AppRoute.Home}>Home</Link>}
          />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<Link href={AppRoute.LikedQuotes}>Liked Quotes</Link>}
          />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
