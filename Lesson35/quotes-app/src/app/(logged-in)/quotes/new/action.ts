'use server';

import { NewQuoteFormState, quoteSchema } from '@/types';
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

  console.table(rawData);

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

  // Call DB to store new quote
  // const now = (new Date()).toISOString();
  // const newQuote = {
  //   quote: result.data.quote,
  //   author: result.data.author,
  //   createdBy: userId,
  //   likedBy: [],
  //   createdAt: now,
  //   updatedAt: now
  // };

  return {
    success: true,
    message: 'Hello, thank you for submitting this form!',
  };
}
