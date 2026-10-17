'use client';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { handleNewQuote } from './action';
import { useActionState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { redirect } from 'next/navigation';
import { NewQuoteFormState } from '@/types';

const intialFormState = {
  success: false,
};

// This is an example of a form with uncontolled inputs
export default function NewQuotePage() {
  const [state, dispatchAction, isPending] = useActionState<
    NewQuoteFormState,
    FormData
  >(handleNewQuote, intialFormState);

  if (isPending) {
    return (
      <div className='flex min-h-full items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (state.success) {
    redirect('/quotes/new/success');
  }

  return (
    <form
      autoComplete='off'
      className='max-w-3xl mx-auto'
      action={dispatchAction}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='quote'>Quote</FieldLabel>
          <Input
            type='text'
            id='quote'
            name='quote'
            defaultValue={state.data?.quote}
          />

          {state.errors?.fieldErrors?.quote && (
            <FieldError errors={state.errors?.fieldErrors.quote}>
              {state.errors?.fieldErrors?.quote?.join(', ')}
            </FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor='author'>Author</FieldLabel>
          <Input type='text' id='author' name='author' defaultValue={state.data?.author}/>
          {state.errors?.fieldErrors?.author && (
            <FieldError errors={state.errors?.fieldErrors.author}>
              {state.errors?.fieldErrors?.author?.join(', ')}
            </FieldError>
          )}
        </Field>

        <Button type='submit'>Save New Quote</Button>
      </FieldGroup>
    </form>
  );
}
