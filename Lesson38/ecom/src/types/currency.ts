import { Currency } from '@/prisma/enums';

export const EU_CURRENCY_OPTIONS: { value: Currency; label: string }[] = [
  { value: Currency.members.EUR, label: 'Euro (€)' },
  { value: Currency.members.GBP, label: 'British pound (£)' },
  { value: Currency.members.TRY, label: 'Turkish lira (₺)' },
];

export function formatPrice(priceCents: number, currency: Currency): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  }).format(priceCents / 100);
}

/** Converts a validated major-unit price string (e.g. "19.00") to integer cents. */
export function priceStringToCents(price: string): number {
  const [whole, fraction = ''] = price.split('.');
  return Number(whole) * 100 + Number(fraction.padEnd(2, '0').slice(0, 2));
}
