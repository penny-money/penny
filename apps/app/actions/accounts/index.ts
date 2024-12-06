'use server';

import { fullAuthClient } from '../safe-action';
import { createAccountSchema } from '../schema';

export const createAccountAction = fullAuthClient
  .metadata({
    name: 'create-account-action',
  })
  .schema(createAccountSchema)
  .action(async ({ ctx, parsedInput: data }) => {
    await ctx.db.account.create({
      data: {
        ...data,
        userId: ctx.user.userId,
      },
    });
  });
