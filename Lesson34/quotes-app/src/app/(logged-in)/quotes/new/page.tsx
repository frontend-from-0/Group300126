'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import { handleNewQuote } from './action';
import { NewQuoteFormState } from '@/types';
import {redirect} from 'next/navigation'

const intialFormState = {
  success: false,
  data: {
    quote: '',
    author: '',
  },
};

export default function NewQuotePage() {
  const [state, dispatchAction, isPending] = useActionState<
    NewQuoteFormState,
    FormData
  >(handleNewQuote, intialFormState);

  console.log(state);

  if (state.success) {
    redirect('/quotes/new/success');
  }

  return (
    <form className='max-w-3xl mx-auto flex flex-col gap-6' action={dispatchAction}>
      <Field>
        <FieldLabel htmlFor='newQuote'>Quote</FieldLabel>
        <Input
          id='newQuote'
          type='text'
          autoComplete='off'
          aria-invalid={!!state.errors?.quote?.join('')}
          name='quote'
          defaultValue={state.data?.quote ?? ''}
        />
        {!!state.errors?.quote?.join('') ? (
          <FieldError errors={[...state.errors?.quote]}>
            {state.errors?.quote?.join(' ')}
          </FieldError>
        ) : (
          <></>
        )}
      </Field>
      <Field>
        <FieldLabel htmlFor='newAuthor'>Author</FieldLabel>
        <Input
          id='newAuthor'
          type='text'
          autoComplete='off'
          aria-invalid={!!state.errors?.author?.join('')}
          name='author'
          defaultValue={state.data?.author ?? ''}
        />
        {!!state.errors?.author?.join('') ? (
          <FieldError errors={[...state.errors?.author]}>
            {state.errors?.author?.join(' ')}
          </FieldError>
        ) : (
          <></>
        )}
      </Field>
      <Button
        className={'w-full'}
        size='lg'
        type='submit'
        disabled={!!isPending}
      >
        {isPending ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
}
