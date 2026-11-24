// Currency and Category are defined once, in src/prisma/contract.prisma.
// This file turns those contract enums into values the app can import.
//
// mongoStatic reads the emitted contract and does not open a database
// connection, so forms and filters can import these enums without DATABASE_URL.
// db.enums is the same data, but db.ts connects to MongoDB, so keep UI imports here.
//
// Each export is both a runtime accessor and a type:
//   Currency.members.EUR     one member, e.g. the form's default currency
//   Currency.values          every member, passed to z.enum(...)
//   Currency.has(value)      type guard for an unknown string
//   type Currency            "EUR" | "GBP" | "TRY", from Currency.Value
// Do not copy the members into another TypeScript enum. Add a currency or
// category in the contract, run `npx prisma contract emit`, and this file picks it up.

import mongoStatic, { contractFromJson } from '@prisma/orm-mongo/static';
import type { Contract } from './contract.d.js';
import contractJson from './contract.json' with { type: 'json' };

const { enums } = mongoStatic({
  contract: contractFromJson<Contract>(contractJson),
});

export const Currency = enums.Currency;
export type Currency = typeof Currency.Value;

export const Category = enums.Category;
export type Category = typeof Category.Value;
