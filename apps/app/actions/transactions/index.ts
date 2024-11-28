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
      data,
      include: {
        account: true,
      },
    });

    // Update account balance based on transaction type
    const balanceChange = data.type === 'EXPENSE' ? -data.amount : data.amount;

    await ctx.db.account.update({
      where: {
        id: data.accountId,
      },
      data: {
        balance: {
          increment: balanceChange,
        },
      },
    });

    return transaction;
  });

