import mongo from '@prisma/orm-mongo/runtime';
import { contractFromJson } from '@prisma/orm-mongo/static';
import type { Contract } from './contract.d.js';
import contractJson from './contract.json' with { type: 'json' };

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

export const contract = contractFromJson<Contract>(contractJson);

export const db = mongo({
  contract,
  url: dbUrl,
});
