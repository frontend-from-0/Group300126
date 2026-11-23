## Prisma 8 CLI Commands (MongoDB)

| Command | What it does |
| --- | --- |
| `npx create-prisma@latest --provider mongodb` | Scaffold a new Prisma 8 + MongoDB project |
| `npx prisma@latest contract emit` | Emit the contract from your schema (replaces `generate`) |
| `npx prisma@latest migration plan --name <name>` | Plan a migration from contract changes |
| `npx prisma@latest db migrate` | Apply pending migrations to the database |
| `npx prisma@latest db update` | Push schema changes without migration history (dev shortcut, replaces `db push`) |
| `npx prisma@latest db verify` | Check the DB matches the contract |
| `npx prisma@latest migration list` | List all on-disk migrations |
| `npx prisma@latest migration status` | Show which migrations are pending on the database |
| `npx prisma@latest contract format` | Format your PSL contract source |

**MongoDB:** requires a **replica set** (Atlas provides one by default; locally use a single-node replica set).

---

## Common CRUD Queries (MongoDB)

```ts
import mongo from "@prisma/orm-mongo/runtime";
import type { Contract } from "./contract.d";
import contractJson from "./contract.json" with { type: "json" };

const db = mongo<Contract>({
  contractJson,
  url: process.env.MONGODB_URL,
  dbName: "app",
});
```

### Create

```ts
// Create one
const product = await db.orm.products.create({
  name: "T-Shirt",
  price: 29.99,
  inStock: true,
});

// Create many
const products = await db.orm.products.createAll([
  { name: "Hat", price: 15, inStock: true },
  { name: "Scarf", price: 20, inStock: false },
]);
```

### Read

```ts
// Get all
const all = await db.orm.products.all();

// Find with filter
const cheap = await db.orm.products.where({ inStock: true }).all();

// Find one (or null)
const one = await db.orm.products.where({ name: "T-Shirt" }).first();

// Pagination
const page = await db.orm.products.limit(10).offset(20).all();
```

### Update

```ts
// Update one
const updated = await db.orm.products
  .where({ name: "T-Shirt" })
  .update({ price: 24.99 });

// Update many — returns count of affected docs
const count = await db.orm.products
  .where({ inStock: false })
  .updateCount({ inStock: true });
```

### Delete

```ts
// Delete one
const deleted = await db.orm.products
  .where({ name: "Scarf" })
  .delete();

// Delete many — returns count
const deletedCount = await db.orm.products
  .where({ inStock: false })
  .deleteCount();
```

### Upsert

```ts
const product = await db.orm.products
  .where({ name: "Hat" })
  .upsert({
    create: { name: "Hat", price: 15, inStock: true },
    update: { price: 12 },
  });
```