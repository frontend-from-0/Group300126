# Lesson 38 – Instructor notes (Group300126)

**Topic:** MongoDB + Prisma for data storage (create product page); Integrating file storage in NextJS project (Vercel Blob)
**When:** Tue 24 Nov 2026, 18:30–20:30 (Stockholm, CET)
**Historical source:** `frontend-from-0/Group021125` Lesson39, taught Thu 10 Sep 2026
- updated starter `c0b33ed` "Update lesson39 starter files" (docs only vs original starter `2f8c572`)
- completed `ac8fcbf` "Add Lesson39 completed files"
- Same topic was also taught as Group200825/Group150825 Lesson39 (Wed 17 Jun 2026) and Group130625/Group11042025 Lesson39 (Mon 30 Mar 2026).

> Student branch `prep-lesson-38` has the pre-built ecom shell, Prisma handouts, `.env.example`, and a `createProduct` action that validates the form then TODOs the save/upload.
> This branch adds the finished Prisma + Vercel Blob wiring (what we build in class) and these notes.

## Changes vs the historical code

- **Roles claim namespace aligned** to `https://ecom-300126/roles`, matching `Lesson37/auth0-action.ts`. The historical Lesson39 starter/completed (and the Lesson37 ecom Anna pushed to main after class) still use `https://pyp-admin/roles`. If the class Auth0 tenant/action was switched to `pyp-admin`, change the one constant to match it. Otherwise keep `ecom-300126` and make sure the post-login action matches.
- Package name `ecom-200825` → `ecom-300126`.
- Added `ecom/.env.example` (Auth0 + `DATABASE_URL` + `BLOB_READ_WRITE_TOKEN`) and `!.env.example` in `ecom/.gitignore`.
- Dropped `ecom/src/generated/` (leftover Prisma 6 client with a Mac-only `libquery_engine-darwin.dylib.node` and a hard-coded `/Users/annasvst/...` path). The completed app uses Prisma 8 contract files under `src/prisma/` instead. `src/generated/` is gitignored.
- No secrets were in the historical code.

## How this relates to Lesson 37

The Lesson38 starter is **not** a literal copy of last week's `Lesson37/ecom` placeholders (`(require-admin)` / `(require-user)` route groups, `TopNavigation`). Same as in Group021125, the Prisma lesson starts from a richer pre-built shop shell: admin product pages (new/edit/delete), storefront catalog, validation, and a create-product form. Students should work in `Lesson38/ecom`. Auth0 is the same application as Lesson 37.

## Lesson plan (~120 min)

1. **Recap the data flow (10–15 min)** – creating a product writes images to Vercel Blob (URLs come back), then product data (including `imageUrls`) to MongoDB via Prisma. Show `prisma.md` (Prisma 8 CLI + CRUD) and `prisma-integration.md` (install, contract, `DATABASE_URL`).
2. **Prisma 8 + MongoDB setup (30–40 min)** – from `ecom/`: install Prisma 8 packages (`@prisma/orm-mongo`, `@prisma/client`, `@prisma/cli-engine`; use `--legacy-peer-deps` if npm hits the Arborist `edgesOut` bug). Add `prisma.config.ts`, author `src/prisma/contract.prisma` (Product + User, `ObjectId` + `@map("_id")`, `@@map("products")`), `npx prisma@latest contract emit`, add `src/prisma/db.ts`. MongoDB must be a replica set (Atlas is fine). Put `DATABASE_URL` in `.env.local`.
3. **Wire product reads/writes (20–25 min)** – implement `src/lib/products.ts` with `db.orm.products` (`all` / `where` / `create`) and `toAppProduct`. Storefront filters and admin list should start returning real rows.
4. **Vercel Blob upload (20–25 min)** – complete `createProduct` in `src/app/admin/products/new/action.ts`: `put()` each image under `products/…`, collect URLs, then `createProductRecord`. `BLOB_READ_WRITE_TOKEN` in `.env.local`. `next.config.ts` already allows `*.public.blob.vercel-storage.com`.
5. **Demo (10 min)** – log in as admin, create a product with images, confirm it appears in the admin table and on the storefront.

## Gotchas

- Roles missing → check the namespace (most common bug; happened in Group021125 and Group200825, and the Lesson37 ecom on main currently has `pyp-admin` again). Re-login after changing the Auth0 action.
- Atlas IP allowlist: add `0.0.0.0/0` if you need to reach the cluster from class machines (same as the Lesson 36 quotes homework).
- Prisma 8 is contract-based (`contract emit`, `db update`), not the old `prisma generate` / `schema.prisma` flow. The starter `package.json` still has `"build": "prisma generate && next build"` before Prisma is installed — that is expected; the completed `package.json` switches the scripts once Prisma 8 is in place.
- npm 9/10 may fail Prisma install with `Cannot read properties of null (reading 'edgesOut')` — retry with `--legacy-peer-deps`.
- Blob uploads need the server action to run on the server (`"use server"`) and a token in `.env.local`. Restart `npm run dev` after changing env vars.

## Homework idea

Implement edit/delete product (pages already exist as shells) using the same Prisma client, and/or add a second image on create.
