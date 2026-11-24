import { z } from "zod";

import { Currency } from "@/types/currency";

export const currencySchema = z.enum(Currency);

export type CurrencyInput = z.infer<typeof currencySchema>;
