'use server';

import { database } from '@repo/database';
import { fullAuthClient } from '../safe-action';
import { createAccountSchema } from '../schema';

export const createAccountAction = fullAuthClient
  .metadata({
    name: 'create-account-action',
  })
  .schema(createAccountSchema)
  .action(async ({ ctx, parsedInput: data }) => {
    await database.account.create({
      data: {
        ...data,
        userId: ctx.user.userId,
      },
    });
  });
