import { z } from "zod";

import { Currency } from "@/prisma/enums";

export const currencySchema = z.enum(Currency.values);

export type CurrencyInput = z.infer<typeof currencySchema>;
