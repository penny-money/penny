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
    const account = await database.account.create({
      data: {
        ...data,
        userId: ctx.user.userId,
      },
      select: {
        id: true,
        balance: true,
      },
    });

    // Create a balance snapshot on account creation
    await database.balanceSnapshots.create({
      data: {
        accountId: account.id,
        balance: account.balance,
        snapshotDate: new Date(),
      },
    });
  });
