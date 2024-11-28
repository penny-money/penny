'use server';

import { fullAuthClient } from '../safe-action';
import { createBudgetSchema } from '../schema';

export const createBudgetAction = fullAuthClient
  .metadata({
    name: 'create-budget-action',
  })
  .schema(createBudgetSchema)
  .action(async ({ ctx, parsedInput: data }) => {
    await ctx.db.budget.create({
      data: {
        ...data,
        userId: ctx.user.userId,
      },
    });
  });
