'use client';

import { createAccountAction } from '@/actions/accounts';
import { createAccountSchema } from '@/actions/schema';
import { AppSheet } from '@/components/sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/design-system/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/design-system/components/ui/form';
import { Input } from '@repo/design-system/components/ui/input';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

function useCreateAccountForm() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      accountNumber: '',
      balance: 0,
      currency: 'KES',
      isActive: true,
      name: '',
      type: 'CASH',
    },
  });

  const createAccount = useAction(createAccountAction);

  async function onSubmit(values: z.infer<typeof createAccountSchema>) {
    try {
      await createAccount.executeAsync(values);
      form.reset();
      setOpen(false);
    } catch {
      form.setError('root', {
        message: 'Something went wrong. Please try again.',
      });
    }
  }

  return {
    createAccount,
    form,
    open,
    onSubmit,
    setOpen,
  };
}

export function CreateAccountForm() {
  const { createAccount, form, open, onSubmit, setOpen } =
    useCreateAccountForm();

  const title = 'Create new account';
  const description = 'Manually create a new account using this form';

  return (
    <AppSheet
      open={open}
      setOpen={setOpen}
      title={title}
      description={description}
    >
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <FormField
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Balance</FormLabel>
                  <FormControl>
                    <Input step="0.01" type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button fullWidth type="submit" className="mt-4">
            {createAccount.isExecuting ? (
              <span>Saving</span>
            ) : (
              <span>Save</span>
            )}
          </Button>
        </form>
      </Form>
    </AppSheet>
  );
}
