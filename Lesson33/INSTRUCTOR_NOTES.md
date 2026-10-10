# Lesson 33 – Authentication (Auth0) — Instructor notes

**Cohort:** Group300126 (Web Developer) · **When:** Tue 13 Oct 2026, 19:30–21:30 Stockholm (20:30 TR)
**Historical source:** `frontend-from-0/Group021125` Lesson34 (30 Jul 2026, same title) — starter `00076cc`, completed `63b5455` (renumbered 34 → 33).
The historical code was on Group021125's `random-quotes`; here the same steps are ported onto this cohort's own `quotes-app` (copied from Lesson32).

## Flow
1. `authentication.md`: authentication vs authorisation, OAuth/OIDC flow (login → Auth0 → callback → session cookie), 401 vs 403.
2. Auth0 dashboard: create Regular Web Application; Allowed Callback URL `http://localhost:3000/auth/callback`, Logout URL `http://localhost:3000`.
3. `npm i @auth0/nextjs-auth0`; copy `.env.example` → `.env.local` (`AUTH0_SECRET` = `openssl rand -hex 32`).
4. `src/lib/auth0.ts` – `new Auth0Client()`.
5. `src/proxy.ts` – `auth0.middleware(request)` (Next 16 "proxy" = old middleware); mounts `/auth/login|logout|callback|profile`.
6. `layout.tsx` (now async server component) – `auth0.getSession()`; Login/Logout as plain `<a>` links (not `<Link>`, they are API routes). Base UI Button uses `render` + `nativeButton={false}`.
7. `TopNavigation` – show Liked Quotes/Settings only when logged in.
8. `/user/settings` – client component with `useUser()`; profile picture via `next/image` (`images.remotePatterns` in `next.config.mjs`).
9. `UserContextProvider` – replace hard-coded `user-1234` with Auth0 `user.sub` (fallback `anonymous`).

Verified: `next build` passes on this branch (with dummy env vars).
Homework idea: protect `/user/*` pages (redirect to `/auth/login` when no session).
