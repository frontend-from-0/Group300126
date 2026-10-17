'use server';

import { auth0 } from '@/lib/auth0';
import { NewQuoteFormState, NewQuoteSchema } from '@/types';
import z from 'zod';


export async function handleNewQuote(
  _currentState: NewQuoteFormState,
  formData: FormData,
): Promise<NewQuoteFormState> {
  const session = await auth0.getSession();

  if (!session) {
    return {
      success: false,
      message: 'Please log in to save the quote',
    };
  }

  const rawData = {
    quote: formData.get('quote') ?? '',
    author: formData.get('author') ?? '',
  };

  const safeParsedResult = NewQuoteSchema.safeParse(rawData);

  if (!safeParsedResult.success) {
    const errors = z.flattenError(safeParsedResult.error);

    console.log('errors from zod', errors);

    return {
      success: false,
      errors: {
        fieldErrors: errors.fieldErrors
      },
      data: {
        quote: String(rawData.quote),
        author: String(rawData.author)
      }
    }
  } else {
    return {
      success: true,
    }
  }
}


/* 
Plain error result:
error: Error [ZodError]: [
    {
      "origin": "string",
      "code": "too_small",
      "minimum": 1,
      "inclusive": true,
      "path": [
        "author"
      ],
      "message": "Minimum author name length is be 1 character."
    }

*/