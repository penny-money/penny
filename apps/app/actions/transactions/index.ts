'use server';

import { fullAuthClient } from '../safe-action';
import { createTransactionSchema } from '../schema';

export const createTransactionAction = fullAuthClient
  .metadata({
    name: 'create-transaction-action',
  })
  .schema(createTransactionSchema)
  .action(async ({ parsedInput: data, ctx }) => {
    const transaction = await ctx.db.transaction.create({
      data: {
        ...data,
        updatedAt: new Date(),
      },
      include: {
        account: true,
      },
    });

    // Update account balance based on transaction type
    const balanceChange = data.type === 'EXPENSE' ? -data.amount : data.amount;
    const account = await ctx.db.account.update({
      where: {
        id: data.accountId,
      },
      data: {
        balance: {
          increment: balanceChange,
        },
        updatedAt: new Date(),
      },
      select: {
        id: true,
        balance: true,
      },
    });

    // Add a balance snapshot on transaciton creation
    await ctx.db.balanceSnapshots.create({
      data: {
        balance: account.balance,
        accountId: account.id,
        snapshotDate: new Date(),
      },
    });

    return transaction;
  });
