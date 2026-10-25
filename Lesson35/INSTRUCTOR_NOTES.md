# Lesson 35 – Client-side form validation in Next.js (React Hook Form) — Instructor notes

**Cohort:** Group300126 (Web Developer) · **When:** Tue 27 Oct 2026, 18:30–20:30 Stockholm (CET; 20:30 TR)
**Historical source:** `frontend-from-0/Group021125` Lesson36 `random-quotes` (same topic) — starter `a6a6768`, completed `dbb4618`. Rebuilt on this cohort's own `Lesson34/quotes-app` (Auth0 + Server Action + Zod form from Lesson 34).

## What to walk students through (client-side validation + React Hook Form)

Goal: same Zod rules on the client for fast UX, and still on the server so bad data never lands in the DB.

1. **Server vs client.** Recap Lesson 34: Server Action + `quoteSchema.safeParse` is mandatory. Client validation is optional UX — instant feedback, fewer wasted round-trips — but a user can disable JS or POST anyway. Never trust the browser.
2. **Pain of hand-rolled client validation** on `/quotes/example`: controlled inputs + `validateQuote` on every `onChange` (set value + error per keystroke). Fine for one field; ugly once every field needs the same dance.
3. **React Hook Form basics.** `useForm({ mode: 'onChange', resolver: zodResolver(quoteSchema) })`, spread `{...register('quote')}` / `{...register('author')}`, read `formState.errors`. `register` still supplies `name`, so native `FormData` in the Server Action still works.
4. **One schema, two places.** `quoteSchema` via `zodResolver` on the client and `safeParse` in the Server Action — single source of truth, same messages.
5. **Wire into `/quotes/new`** without dropping Server Actions / `useActionState`. Keep `action={dispatchAction}`. Show a client error only when there is no server error for that field (`errors?.quote && !state.errors?.quote?.join('')`). `aria-invalid` should combine both.
6. **Live demos.** Short quote → instant client error. Disable JS / bypass the client → server still catches it and the field error still shows.

Optional stretch: `handleSubmit` so the form does not call the Server Action when client validation fails (see Known gaps).

## Starter (student branch `prep-lesson-35`)
- `Lesson35/quotes-app` = copy of `Lesson34/quotes-app` from `main` (Lesson34 completed: `/quotes/new` with `useActionState` + Server Action `handleNewQuote` + Zod `quoteSchema` in `src/types.ts`; `/quotes/example` controlled form).
- Plumbing pre-installed: `react-hook-form` (^7.85.0) and `@hookform/resolvers` (^5.9.2) added to `package.json` / `package-lock.json`, so no `npm install <pkg>` live — students just run `npm install`.
- Auth0 `.env.local` is the same as Lesson 34 (students copy theirs over).

## Flow (as taught historically)
1. Recap: server-side validation (Server Action + Zod `safeParse` + `z.flattenError`) — why it is mandatory, and why client-side validation is UX only.
2. Controlled form on `/quotes/example`: add `validateQuote(value)` called from `onChange` → set value + error on every keystroke (min 3 chars). Show the re-render cost / boilerplate per field.
3. Introduce React Hook Form: uncontrolled inputs via `register`, `formState.errors`, `mode: 'onChange'`.
4. `zodResolver(quoteSchema)` — reuse the *same* Zod schema on client and server (single source of truth).
5. On `/quotes/new`: replace `name='quote'`/`name='author'` with `{...register('quote')}` / `{...register('author')}` (register supplies `name`, so `FormData` in the Server Action still works), keep `action={dispatchAction}` and `useActionState`.
6. Show client errors only when there is no server error for the field: `errors?.quote && !state.errors?.quote?.join('') && <FieldError …/>`; `aria-invalid` combines both.
7. Demo: type invalid input → instant client error; disable JS / bypass → server error still shown.

## Completed state
See this branch: `src/app/(logged-in)/quotes/new/page.tsx` (RHF + zodResolver) and `src/app/(logged-in)/quotes/example/page.tsx` (`validateQuote`).
Adapted to Group300126 naming: schema is `quoteSchema` from `@/types` (Group021125 used `NewQuoteSchema` from `@/types/quotes`), errors are `state.errors.quote` (not `state.errors.fieldErrors.quote`).

## Known gaps / discussion points
- RHF `handleSubmit` is not used: the form still submits through the Server Action even when client validation fails (server validation catches it). Optional extension: `onSubmit={handleSubmit(() => startTransition(() => dispatchAction(new FormData(formRef.current))))}`.
- `/quotes/example`: `{quoteError ?? <FieldError…>}` is a bug from Lesson 34 (`??` renders the string, never the component); the Author field has a hard-coded `aria-invalid` and "Choose another username." error. Good live bug-hunt.
- Pre-existing `npm run build` TypeScript errors in `src/components/WarningDialog.tsx` (`className` required on shadcn dialog parts; also present in Lesson34). `npm run dev` works. Quick fix if needed: give `className` a default in `components/ui/dialog.jsx`.
- The historical Group021125 completed commit also pinned `shadcn` to `4.12.0`; not needed here.

## Exercises
None prepared in advance. Suggested homework: add RHF + zodResolver to another form (e.g. user settings) and use `handleSubmit` to block submission when invalid.
