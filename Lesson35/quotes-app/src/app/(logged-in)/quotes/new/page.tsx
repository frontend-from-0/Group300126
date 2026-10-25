'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import { handleNewQuote } from './action';
import { NewQuoteFormState, quoteSchema } from '@/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {redirect} from 'next/navigation'

const intialFormState = {
  success: false,
  data: {
    quote: '',
    author: '',
  },
};

export default function NewQuotePage() {
  // Client-side validation with React Hook Form, reusing the same Zod schema as the Server Action
  const {
    register,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: zodResolver(quoteSchema) });

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
          aria-invalid={!!errors?.quote || !!state.errors?.quote?.join('')}
          defaultValue={state.data?.quote ?? ''}
          {...register('quote')}
        />
        {errors?.quote && !state.errors?.quote?.join('') && (
          <FieldError errors={[errors.quote]}>{errors.quote.message}</FieldError>
        )}
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
          aria-invalid={!!errors?.author || !!state.errors?.author?.join('')}
          defaultValue={state.data?.author ?? ''}
          {...register('author')}
        />
        {errors?.author && !state.errors?.author?.join('') && (
          <FieldError errors={[errors.author]}>{errors.author.message}</FieldError>
        )}
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
