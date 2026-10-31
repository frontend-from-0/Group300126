# Project structure: Next.js + MongoDB

This note describes how to organise `quotes-app` once quotes live in MongoDB instead of `src/quotes.ts`.

The goal is a **layered** app: UI renders, server actions orchestrate a request, repositories talk to the database. Each layer has one job.

## Recommended layout

```text
src/
  lib/
    auth0.ts                 # Auth0 client
    db/
      client.ts              # MongoClient singleton + getDb()
      collections.ts         # typed accessors, e.g. quotesCollection()
      quote-document.ts      # Mongo document shape with _id (repository-only)

  repositories/
    quotes.ts                # find, insert, like — all Mongo queries for quotes

  types.ts                   # domain Quote, Zod schemas, form state (no ObjectId)

  app/
    (logged-in)/
      quotes/new/action.ts   # auth → validate → call repository → return FormState
      quotes/new/page.tsx    # UI only; imports the action, not Mongo

```

Put `import 'server-only'` at the top of `lib/db/client.ts` and every repository file. If a Client Component imports those modules, the build fails instead of shipping the database driver to the browser.

## Layers and responsibilities

| Layer | Owns | Must not own |
|---|---|---|
| `lib/db` | Connection pooling, database name, collection names | Auth, Zod, redirects, React |
| `repositories/quotes.ts` | Queries, inserts, mapping `_id` → `id: string` | Sessions, `FormData`, HTTP status codes |
| Server actions / route handlers | Auth0, validation, mapping errors to UI | `MongoClient`, collection names, raw documents |
| Pages / components / context | Rendering and local UI state | Anything from `mongodb` or `lib/db` |

### Domain type vs document type

Keep UI types free of Mongo types.

- **Domain** (used by pages and context): `{ id: string; quote: string; author: string; likedBy: string[] }`
- **Document** (used only in the repository): `{ _id: ObjectId; quote: string; author: string; likedBy: string[]; createdBy: string }`

Convert at the repository boundary. Client code never imports `ObjectId`.

## Why database calls do not belong in a server action

A server action is the **entry point for one user request**. It is a good place for:

1. Checking the session (`auth0.getSession()`)
2. Reading `FormData`
3. Validating with Zod
4. Deciding what to return to the form (`FormState`, redirect, error message)

It is a poor place for `collection.insertOne(...)` and `collection.find(...)`.

### 1. Different jobs, different change rates

Auth and form validation change when the UI or Auth0 setup changes. Queries change when you add indexes, pagination, or a new collection field.

If both live in `action.ts`, every new screen copies the same `db.collection('quotes')` snippet. A bug fix (for example mapping `_id` to `id`) has to be repeated in every action.

The repository is the single place that knows how quotes are stored.

### 2. Reuse from more than one entry point

The same write will be needed from:

- `quotes/new/action.ts` (create quote)
- a later “like” action
- a Server Component that lists quotes
- an `app/api/.../route.ts` if you add a public HTTP API

If Mongo lives inside one action, the API route cannot reuse it without importing that action (which pulls in form-state types and Auth0). A repository function like `insertQuote(...)` can be called from any server entry point.

### 3. Server actions still run on the server — that is not a data layer

`'use server'` only means “this function is callable from the client and executes on the server”. It does **not** mean “this is where persistence belongs”.

Mixing `getSession()`, `safeParse()`, and `insertOne()` in one function makes the action hard to test: you cannot check “does insertQuote write the right document?” without also mocking Auth0 and FormData.

### 4. Accidental leakage to the client

Pages and Client Components (`QuotesContextProvider`) must never import the Mongo driver. Next.js bundles whatever a Client Component imports.

Keeping all `mongodb` imports behind `server-only` repositories makes that mistake a compile error, not a runtime surprise.

### 5. Connection handling is not request logic

In Next.js (especially `next dev` and serverless), you must reuse one `MongoClient` (typically cached on `globalThis`). That caching belongs in `lib/db/client.ts`.

If every action opens its own client, you leak connections. If every action copies the cache snippet, you will drift. One client module, many repository functions.

## What a server action should look like

`handleNewQuote` stays in `quotes/new/action.ts` and stays colocated with the page. After validation it should call the repository, not the collection:

```ts
// Conceptual shape — auth and Zod stay here, Mongo does not.
const session = await auth0.getSession();
if (!session) {
  return { success: false, message: 'Please log in to save the quote' };
}

const parsed = quoteSchema.safeParse(rawData);
if (!parsed.success) {
  return { success: false, errors: { fieldErrors: ... }, data: ... };
}

await insertQuote({
  ...parsed.data,
  createdBy: session.user.sub,
});

return { success: true };
```

`insertQuote` lives in `src/repositories/quotes.ts` and is the only function that calls `quotesCollection().insertOne(...)`.

## What to avoid

**Queries inside `page.tsx` or Client Components.** Components should receive data or call actions. They should not know collection names.

**A `src/db` folder that also holds React.** Keep the App Router tree for routing. Put I/O under `lib/db` and `repositories`.

**Environment variables in Client Components.** `MONGODB_URI` and `MONGODB_DB` belong in `.env.local` and are read only in `lib/db/client.ts`.
