/** ISO 4217 codes — supported shop currencies */
export enum Currency {
  EUR = "EUR",
  GBP = "GBP",
  TRY = "TRY",
}

export const EU_CURRENCY_OPTIONS: { value: Currency; label: string }[] = [
  { value: Currency.EUR, label: "Euro (€)" },
  { value: Currency.GBP, label: "British pound (£)" },
  { value: Currency.TRY, label: "Turkish lira (₺)" },
];

export function isCurrency(value: string): value is Currency {
  return Object.values(Currency).includes(value as Currency);
}

export function formatPrice(priceCents: number, currency: Currency): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
  }).format(priceCents / 100);
}

/** Converts a validated major-unit price string (e.g. "19.00") to integer cents. */
export function priceStringToCents(price: string): number {
  const [whole, fraction = ""] = price.split(".");
  return Number(whole) * 100 + Number(fraction.padEnd(2, "0").slice(0, 2));
}
