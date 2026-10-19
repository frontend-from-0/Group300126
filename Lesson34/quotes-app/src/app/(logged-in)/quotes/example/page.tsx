'use client';

import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
import {Input} from '@/components/ui/input';
import { useState } from 'react';

const quoteRegex = /[^\p{L}\p{N}\p{M}\p{Zs}'"“”‘’.,!?;:()\-—–…/&@#%+$*=_<>\[\]{}]/gu;

// Form with controlled inputs example
export default function ExampleFormPage () {
  const [quote, setQuote] = useState('Some initial value');
  const [quoteError, setQuoteError] = useState(null);

  function handleSubmit (event) {
    event.preventDefault();

    if (quote.length <= 3) {
      setQuoteError('Length of the quote should be at least 3 characters.');
      return;
    } else if (quoteRegex.test(quote)) {
      setQuoteError('Quotes can only contain letters, numbers, and common puctuation sign.')
      return;
    } else {
      setQuoteError(null);
      console.log('Form submitted successfully, form values:', quote);
    }
   };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
         <Field>
           <FieldLabel htmlFor="quote">Quote</FieldLabel>
           <Input type="text" id="quote" autoComplete="off" onChange={(event) => setQuote(event.target.value.trim())} value={quote}/>

            {// TODO: Anna to check why FieldError requires children
            }
           <FieldError errors={[quoteError]}>{quoteError}</FieldError>
         </Field>
      </FieldGroup>
    </form>
  )
}