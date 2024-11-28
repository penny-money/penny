'use client';

import { createBudgetAction } from '@/actions/budgets';
import { createBudgetSchema } from '@/actions/schema';
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

function useCreateBudgetForm() {
  const form = useForm<z.infer<typeof createBudgetSchema>>({
    resolver: zodResolver(createBudgetSchema),
    defaultValues: {
      name: '',
      description: '',
      targetAmount: 0,
    },
  });

  const createBudget = useAction(createBudgetAction);

  async function onSubmit(values: z.infer<typeof createBudgetSchema>) {
    await createBudget.executeAsync(values);
  }

  return {
    createBudget,
    form,
    onSubmit,
  };
}

export function CreateBudgetForm() {
  const { createBudget, form, onSubmit } = useCreateBudgetForm();

  console.log(form.formState.errors);

  const title = 'Create new budget';
  const description = 'Manually create budget';

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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="targetAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Amount</FormLabel>
                <FormControl>
                  <Input step="0.01" type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button fullWidth type="submit" className="mt-4">
            {createBudget.isExecuting ? <span>Saving</span> : <span>Save</span>}
          </Button>
        </form>
      </Form>
    </AppSheet>
  );
}
