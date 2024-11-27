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
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

function useCreateAccountForm() {
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
    await createAccount.executeAsync(values);
  }

  return {
    createAccount,
    form,
    onSubmit,
  };
}

export function CreateAccountForm() {
  const { createAccount, form, onSubmit } = useCreateAccountForm();

  const title = 'Create new account';
  const description = 'Manually create a new account using this form';

  return (
    <AppSheet title={title} description={description}>
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
