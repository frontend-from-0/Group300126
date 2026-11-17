# Lesson 37 – NextJS Ecommerce app setup & System Design, Admin auth

In this lesson we start the ecommerce project that we will keep building in the next lessons.
We will:

1. Discuss the **system design** of the shop: which users we have (admin, customer), what each of them can do, and which external services we will use (Auth0, Stripe, image storage, database, email).
2. **Create the Next.js app** in `Lesson37/ecom` and add shadcn/ui.
3. Add **Auth0 authentication with roles** so that only admins can open the admin area.

## Files in this folder

| File | What it is |
|---|---|
| `auth0.ts` | Ready-made Auth0 helper (roles, `requireUser`, `requireAdmin`, API helpers). We will move it to `ecom/src/lib/auth0.ts`. |
| `auth0-action.ts` | Code for the Auth0 post-login **Action** that adds the user's roles to the tokens. |
| `.env.example` | Environment variables the app needs. Copy to `ecom/.env.local` and fill in your own values. |

## Before the lesson (optional, saves time)

- Make sure you can log in to your Auth0 dashboard (we used it in Lesson 33).
- Node.js 20+ installed (`node -v`).

## Setup steps we will follow in class

```bash
cd Lesson37
npx create-next-app@latest ecom   # TypeScript, ESLint, Tailwind, src/ dir, App Router, React Compiler
cd ecom
npx shadcn@latest init
npx shadcn@latest add button navigation-menu
npm install @auth0/nextjs-auth0
cp ../.env.example .env.local     # then fill in your Auth0 values
```

> `create-next-app` adds `.env*` to `.gitignore`. Keep it that way so `.env.local` (with your secrets) is never committed.

### Auth0 dashboard

1. **Applications** → create a *Regular Web Application* (`ecom`).
   - Allowed Callback URLs: `http://localhost:3000/auth/callback`
   - Allowed Logout URLs: `http://localhost:3000`
2. **User Management → Roles** → create `admin` and `user`, and assign `admin` to your own user.
3. **Actions → Library** → *Create Action* (post-login), paste the code from `auth0-action.ts`, deploy it, then add it to the **post-login** trigger.
4. The claim namespace in the action (`https://ecom-300126`) and `ROLES_CLAIM` in `auth0.ts` (`https://ecom-300126/roles`) must match.
