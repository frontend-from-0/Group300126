import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireUser } from "@/lib/auth0";

export default async function ProfilePage() {
  const user = await requireUser();

  const displayName = user.name ?? user.email ?? "User";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="mx-auto w-full max-w-lg flex-1 px-4 py-10 sm:px-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your account details from Auth0.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Avatar className="size-16">
            {user.picture ? (
              <AvatarImage src={user.picture} alt={displayName} />
            ) : null}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="font-medium text-foreground">{displayName}</p>
            {user.email ? (
              <p className="text-sm text-muted-foreground">{user.email}</p>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
