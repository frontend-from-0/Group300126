import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


export function TopNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href="/user/orders">Orders</Link>} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href="/user/settings">Settings</Link>} />
        </NavigationMenuItem>
      <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<a href="/auth/login">Login</a>} />
      </NavigationMenuItem>
      <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<a href="/auth/logout">Logout</a>} />
      </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

