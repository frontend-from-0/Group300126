'use client';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import {Input} from '@/components/ui/input';
import { useState } from 'react';

export default function ExampleReactForm() {
  const [quote, setQuote] = useState('');
  const [quoteError, setQuoteError] = useState('');
  const [author, setAuthor] = useState('');


  function handleSubmit (e) {
    e.preventDefault();
    if (quote.length < 1 ) {
    setQuoteError('Length of the quote should be at least 1 character.')
    }
    // call an API and send data or store it in context or something else
  }


  // Validate on every change (controlled input)
  function validateQuote(inputValue) {
    console.log('Triggered validate quote', inputValue);
    setQuote(inputValue);
    if (inputValue.length < 3) {
      setQuoteError('The quote should have at least 3 chars.');
    } else {
      setQuoteError('');
    }
  }

  return (
    // Controlled form
    <form className='max-w-3xl mx-auto' onSubmit={handleSubmit}>
      <Field>
        <FieldLabel htmlFor='newQuote'>Quote</FieldLabel>
        {/* Controlled input - we control it's value */}
        <Input id='newQuote' type='text' autoComplete='off' aria-invalid={!!quoteError} onChange={(e) => validateQuote(e.target.value.trim())} value={quote}/>
        {quoteError ?? <FieldError errors={[quoteError]}>{quoteError}</FieldError>}

      </Field>
        <Field>
        <FieldLabel htmlFor='newAuthor'>Author</FieldLabel>
        <Input id='newAuthor' type='text' autoComplete='off' aria-invalid onChange={(e) => setAuthor(e.target.value.trim())} value={author}/>
        <FieldError errors={[]}>Choose another username.</FieldError>
      </Field>
      <Button className={'w-full'} size='lg' type='submit'>Save</Button>
    </form>
  );
}
