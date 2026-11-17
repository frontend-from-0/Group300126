import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { redirect } from 'next/navigation';

export const auth0 = new Auth0Client();

// Must match the custom claim set by the Auth0 post-login action (see Lesson37/auth0-action.ts): `${namespace}/roles`.
// Common mistake: forgetting the "/roles" suffix or using a different namespace than the action.
const ROLES_CLAIM = 'https://pyp-admin/roles';

export enum AppRole {
  USER = 'user',
  ADMIN = 'admin',
}

export const AllAppRoles = Object.values(AppRole);

export type Auth0SessionUser = Record<string, unknown> & {
  sub?: string;
  name?: string;
  email?: string;
  picture?: string;
};

function tryGetRolesClaimFromIdToken(token: unknown): string[] {
  if (typeof token !== 'string') return [];
  const parts = token.split('.');

  if (parts.length < 2) return [];
  try {
    const payload = JSON.parse(
      Buffer.from(
        parts[1].replace(/-/g, '+').replace(/_/g, '/'),
        'base64',
      ).toString('utf8'),
    ) as Record<string, unknown>;
    const roles = payload[ROLES_CLAIM];

    if (Array.isArray(roles))
      return roles.filter((v): v is string => typeof v === 'string');
    return [];
  } catch {
    return [];
  }
}

export function getRolesFromUser(
  user: Auth0SessionUser | null | undefined,
): string[] {
  const value = user?.[ROLES_CLAIM];
  if (Array.isArray(value))
    return value.filter((v): v is string => typeof v === 'string');
  return [];
}

export function hasRole(
  user: Auth0SessionUser | null | undefined,
  role: AppRole,
): boolean {
  return getRolesFromUser(user).includes(role);
}

export function isAdmin(user: Auth0SessionUser | null | undefined): boolean {
  return hasRole(user, AppRole.ADMIN);
}

export async function getSessionUser(): Promise<Auth0SessionUser | null> {
  const session = await auth0.getSession();
  const tokenSet = ((session ?? {}) as Record<string, unknown>).tokenSet as
    | Record<string, unknown>
    | undefined;

  const user = (session?.user as Auth0SessionUser | undefined) ?? null;

  const userRolesClaim = user?.[ROLES_CLAIM];

  const rolesFromIdToken = tryGetRolesClaimFromIdToken(tokenSet?.idToken);

  const normalizedUser =
    user && !Array.isArray(userRolesClaim) && rolesFromIdToken.length > 0
      ? ({ ...user, [ROLES_CLAIM]: rolesFromIdToken } as Auth0SessionUser)
      : user;

  return normalizedUser;
}

export async function requireUser(): Promise<Auth0SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect('/auth/login');
  return user;
}

export async function requireAdmin(): Promise<Auth0SessionUser> {
  const user = await requireUser();
  if (!isAdmin(user)) redirect('/forbidden');
  return user;
}

export async function getAdmin(): Promise<Auth0SessionUser | null> {
  const user = await getSessionUser();
  if (!user) return null;
  if (isAdmin(user)) {
    return user;
  } else {
    return null;
  }
}


export async function requireUserOr401(): Promise<Auth0SessionUser | Response> {
  const user = await getSessionUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  return user;
}

export async function requireAdminOr403(): Promise<
  Auth0SessionUser | Response
> {
  const userOrResponse = await requireUserOr401();
  if (userOrResponse instanceof Response) return userOrResponse;
  if (!isAdmin(userOrResponse))
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  return userOrResponse;
}
