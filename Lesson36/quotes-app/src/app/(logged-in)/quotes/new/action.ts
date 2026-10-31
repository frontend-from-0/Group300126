'use server';

import { NewQuoteFormState, quoteSchema } from '@/types';
import { insertQuote } from '@/repositories/quotes';
import z from 'zod';
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";


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

  // Store the new quote in the DB (the repository adds _id, likedBy, createdAt, updatedAt)
  await insertQuote({
    quote: result.data.quote,
    author: result.data.author,
    createdBy: userId,
  });

  return {
    success: true,
    message: 'Hello, thank you for submitting this form!',
  };
}
