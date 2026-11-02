'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import { handleNewQuote } from './action';
import { NewQuoteFormState, quoteSchema } from '@/types';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: zodResolver(quoteSchema) });

  console.log('Form errors', errors);

  if (state.success) {
    redirect('/quotes/new/success');
  }

  const quoteInput = watch('quote');

  console.log('quoteInput', quoteInput);

  return (
    <form
      className='max-w-3xl mx-auto flex flex-col gap-6'
      action={dispatchAction}
    >
      {' '}
      {quoteInput === 'Hello World' && <p>This is a surprise message!</p>}
      <Field>
        <FieldLabel htmlFor='newQuote'>Quote</FieldLabel>
        <Input
          id='newQuote'
          type='text'
          autoComplete='off'
          aria-invalid={
            !!state.errors?.quote?.join('') || !!errors.quote?.message
          }
          defaultValue={state.data?.quote ?? ''}
          {...register('quote')}
        />
        {!!errors.quote?.message ? (
          <FieldError errors={[...errors.quote?.message.toString()]}>
            {errors.quote?.message.toString()}
          </FieldError>
        ) : (
          <></>
        )}

        {!errors.quote?.message && !!state.errors?.quote?.join('') ? (
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
          aria-invalid={
            !!state.errors?.author?.join('') || !!errors.author?.message
          }
          name='author'
          defaultValue={state.data?.author ?? ''}
          {...register('author')}
        />
        {!!errors.author?.message ? (
          <FieldError errors={[...errors.author?.message.toString()]}>
            {errors.author?.message.toString()}
          </FieldError>
        ) : (
          <></>
        )}

        {!errors.author?.message && !!state.errors?.author?.join('') ? (
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
