'use server';

import { NewQuoteFormState, quoteSchema } from '@/types';
import z from 'zod';
import { auth0 } from '@/lib/auth0';
import { redirect } from 'next/navigation';
import { insertQuote } from '@/repositories/quotes';

export async function handleNewQuote(
  previousState,
  formData,
): Promise<NewQuoteFormState> {
  const session = await auth0.getSession();

  if (!session) {
    redirect('/auth/login');
  }

  const userId = session.user.sub;

  const rawData = {
    quote: formData.get('quote') ?? '',
    author: formData.get('author') ?? '',
  };

  const result = quoteSchema.safeParse(rawData);

  if (!result.success) {
    const errors = z.flattenError(result.error);

    console.log(errors);

    return {
      success: false,
      data: {
        quote: String(rawData.quote),
        author: String(rawData.author),
      },
      errors: { ...errors.fieldErrors },
    };
  }
  const maybeQuote = await insertQuote({
    quote: result.data.quote,
    author: result.data.author,
    createdBy: userId,
  });

  if (maybeQuote) {
    return {
      success: true,
      message: 'Hello, thank you for submitting this form!',
    };
  } else {
    return {
      success: false,
      message: 'An error occured when saving a quote. Try again later.',
      data: {
        quote: String(rawData.quote),
        author: String(rawData.author),
      },
    };
  }
}
