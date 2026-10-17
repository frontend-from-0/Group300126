# Lesson 34 – Handling forms in NextJS (Server Actions, Zod) — Instructor notes

**Cohort:** Group300126 (Jr. Web Developer, 30012026) · **When:** Tue 20 Oct 2026, 19:30–21:30 Stockholm (20:30 TR)
**Historical source:** `frontend-from-0/Group021125` Lesson35 (6 Aug 2026, identical calendar topic "Handling forms in NextJs (Server Actions, Zod)") — starter `ea4f621`, completed `a81f75a`.
Group021125's historical app is `random-quotes` (radix-ui shadcn); this cohort's app is `quotes-app` (Base UI shadcn, `(logged-in)` route group). As with Lesson 33, the lesson was **rebuilt on quotes-app**.

## Starter (student branch `prep-lesson-34`)
`Lesson34/quotes-app/` = exact copy of this repo's `Lesson33/quotes-app` (Lesson 33 Auth0 completed state on `main`). Historically the starter was likewise just the previous lesson's completed app.

## Flow (historical, mapped to quotes-app)
1. Controlled-input form recap (React way): `/quotes/example` — `useState` value + `onChange`, manual validation (length, regex), `FieldError`.
2. Install shadcn form primitives: `field`, `input`, `label`, `separator`, `spinner` (here added under `src/components/ui/` — `label`/`separator` written for Base UI because this project does not use radix-ui).
3. Server Action with **uncontrolled** inputs: `/quotes/new`
   - `action.ts` with `'use server'`, signature `(prevState, formData)`, `auth0.getSession()` guard, `formData.get('quote' | 'author')`.
   - `npm i zod`; `NewQuoteSchema` (trim, min/max with messages) + `NewQuoteFormState` in `src/types.ts`.
   - `safeParse` → `z.flattenError(error).fieldErrors` → return errors + previously typed values (`defaultValue`) so the form keeps input.
   - `page.tsx` (client): `useActionState(handleNewQuote, initialState)` → `[state, dispatchAction, isPending]`, `<form action={dispatchAction}>`, `Spinner` while pending, `redirect('/quotes/new/success')` on success.
4. Route groups: historically `user/*` was moved into a `(require-user)` group with an auth-check layout. quotes-app already has the `(logged-in)` group + layout from Lesson 33, so the new pages live in `src/app/(logged-in)/quotes/...` (no folder moves needed).
5. Added a "New Quote" link in `TopNavigation` for logged-in users.

## Completed state (this branch)
`src/app/(logged-in)/quotes/new/{action.ts,page.tsx,success/page.tsx}`, `src/app/(logged-in)/quotes/example/page.tsx`, `src/components/ui/{field,input,label,separator,spinner}.jsx`, `src/types.ts` (schema + form state), `TopNavigation.tsx` link, `zod` in `package.json`/lock.

## Notes / caveats
- The action only validates and returns `success: true` — the quote is **not** persisted (same as history; persistence comes with the DB lessons).
- Historical TODO kept in `quotes/example/page.tsx`: "check why FieldError requires children".
- Typo fix vs history: Zod author message "Minimum author name length is be 1 character" → "is 1 character".
- `redirect()` is called during render of a client component on success (historical pattern) — fine for the demo; `useRouter().push` or redirecting inside the action are alternatives to mention.

## Exercises
None prepared. Classroom: Lesson 33 practical assignment (Auth0 on students' own Random Quotes app) is due 20 Oct.

## Verification (box, 17 Oct)
`npm ci` + `next build` with dummy Auth0 env: compiles and generates `/quotes/new`, `/quotes/new/success`, `/quotes/example`. `next build` type-check fails only on 4 **pre-existing** errors in `src/components/WarningDialog.tsx` (dialog components require `className`), inherited unchanged from `Lesson33/quotes-app` on `main`; `npm run dev` is unaffected.
