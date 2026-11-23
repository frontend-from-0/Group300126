# Prisma + MongoDB integration plan

Why Prisma
MongoDB lets you store documents, but using it directly means learning connection setup and MongoDB query syntax, and then manually translating database results into the shapes your app expects. Prisma adds a thin, consistent layer on top: you define your data model once (the contract), and Prisma generates typed APIs for common operations (create/read/update/delete). That reduces mistakes, makes the code easier to reason about, and prevents "mystery runtime errors" as your app grows.

Reference: Prisma builds around a shared, type-safe contract to drive both query typing and schema/tooling workflows ([prisma.io](https://www.prisma.io/)).

Quick glossary:
- Contract (Prisma v8): the source-of-truth data model you write (for example `prisma/contract.prisma` or `prisma/contract.ts`). Prisma reads it and emits machine-readable artifacts (like `contract.json`) plus typed query APIs.
- Schema: a data-model definition file. In older Prisma versions you wrote `schema.prisma`; in Prisma v8, the contract plays the main "schema" role for the Prisma toolchain.

## 1. Prerequisites

- Ensure the project can run on a Node.js 24+ environment (Prisma v8 docs target modern runtimes).
- Have MongoDB available:
  - Local MongoDB (optionally with a replica set for `DATABASE_URL`).
  - MongoDB Atlas (preferred for hosted environments).

## 2. Install Prisma dependencies in

From the project root install Prisma and its client:

```bash
npm i -D prisma @prisma/client
```

> **Known issue:** npm 9.x/10.x may crash with `Cannot read properties of null (reading 'edgesOut')` during install. This is a [known Arborist bug](https://github.com/npm/cli/issues/9787) triggered by wildcard peer dependency ranges in some packages. Fix — add `--legacy-peer-deps`:
> ```bash
> npm i -D prisma @prisma/client --legacy-peer-deps
> ```

Prisma's Prisma v8 CLI is configured via `prisma.config.ts` in the project root and reads environment variables (like `DATABASE_URL`) from `.env`.

Docs:
- [Prisma 8 CLI configuration](https://www.prisma.io/docs/cli/configuration)

## 3. Create Prisma 8 config + MongoDB contract scaffold

Scaffold Prisma 8 for MongoDB (existing-project flow):

```bash
npx prisma@latest orm init --target mongodb
```

After this step, you should have:
- `prisma.config.ts` at the repo root (or a config file path that the CLI created)
- a starter contract file (commonly `prisma/contract.prisma`)
- emitted/generated runtime scaffolding (depending on the command variant you use)

Docs:
- [Add Prisma 8 to an existing MongoDB project](https://www.prisma.io/docs/prisma-orm/add-to-existing-project/mongodb)
- [orm init](https://www.prisma.io/docs/cli/orm-init)
- [Quickstart: Prisma 8 with MongoDB](https://www.prisma.io/docs/v8/quickstart/mongodb)

## 4. Set `DATABASE_URL` for MongoDB

Edit `.env`:

```env
DATABASE_URL="mongodb://127.0.0.1:27017/app?replicaSet=rs0"
```

For MongoDB Atlas, paste the connection string from the Atlas "Connect" UI, and keep the database name consistent with your intended `db` usage.

Docs:
- [Add Prisma Next to an existing MongoDB project](https://www.prisma.io/docs/next/add-to-existing-project/mongodb)

## 5. Author the Prisma 8 contract for the collections you need

Open the scaffolded contract file (commonly `prisma/contract.prisma`) and define your models using Prisma 8 MongoDB conventions.

Key MongoDB conventions for Prisma v8:
- Each document has an `_id` primary key.
- Use `ObjectId` + `@map("_id")` to connect the Prisma field to MongoDB `_id`.
- Use `@@map("collectionName")` to control which MongoDB collection a model uses.

Docs:
- [MongoDB data modeling in Prisma 8](https://www.prisma.io/docs/orm/v8/data-modeling/mongodb)
- [Prisma Schema API (incl. provider/connection notes)](https://docs.prisma.io/docs/orm/reference/prisma-schema-reference)

For this project, start by matching the existing product features (catalog + admin product CRUD).

Example contract shape for a `Product`-like model:

- `id: ObjectId @id @map("_id")`
- `@@map("products")`

## 6. Emit contract artifacts

After editing the contract, emit artifacts:

```bash
bunx prisma@latest contract emit
```

This command is offline (does not require connecting to MongoDB), and it refreshes the generated contract artifacts used by the runtime/query APIs.

Docs:
- [contract emit](https://www.prisma.io/docs/cli/contract-emit)
- [The Prisma 8 data contract](https://www.prisma.io/docs/orm/contract-authoring/the-data-contract)

## 7. Bootstrap or reconcile the database

If the database already exists, reconcile it against the contract:

```bash
bunx prisma@latest db update --db "$DATABASE_URL"
```

After updates, verify drift:

```bash
bunx prisma@latest db verify --db "$DATABASE_URL"
```

Docs:
- [Add Prisma 8 to an existing MongoDB project](https://www.prisma.io/docs/prisma-orm/add-to-existing-project/mongodb)
- [Prisma 8 CLI configuration](https://www.prisma.io/docs/cli/configuration)

## 8. Wire Prisma queries

1. Create a single Prisma runtime/client module for the Next.js server:
   - Put it in a new file such as `src/lib/prisma.ts`.
   - The runtime must read `DATABASE_URL`.
   - Avoid creating a new client per request (use a module-level singleton).

2. Add necessary queries to your project

Docs (query + contract runtime concepts):
- [The Prisma 8 data contract](https://www.prisma.io/docs/orm/contract-authoring/the-data-contract)
- [Add Prisma 8 to an existing MongoDB project](https://www.prisma.io/docs/prisma-orm/add-to-existing-project/mongodb)