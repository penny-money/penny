'use server';

import { revalidatePath } from 'next/cache';
import { fullAuthClient } from '../safe-action';
import { createAccountSchema, deleteAccountSchema } from '../schema';

export const createAccountAction = fullAuthClient
  .metadata({
    name: 'create-account-action',
  })
  .schema(createAccountSchema)
  .action(async ({ ctx, parsedInput: data }) => {
    const account = await ctx.db.account.create({
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
    await ctx.db.balanceSnapshots.create({
      data: {
        accountId: account.id,
        balance: account.balance,
        snapshotDate: new Date(),
      },
    });

    revalidatePath('/accounts');
  });

export const deleteAccountAction = fullAuthClient
  .metadata({
    name: 'delete-account-action',
  })
  .schema(deleteAccountSchema)
  .action(async ({ ctx, parsedInput: { id } }) => {
    await ctx.db.account.update({
      data: {
        isActive: false,
      },
      where: {
        id,
      },
    });

    revalidatePath('/accounts');
  });
