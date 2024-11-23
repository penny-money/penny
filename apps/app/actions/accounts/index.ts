'use server';

import { database } from '@repo/database';
import { authActionClient } from '../safe-action';
import { createAccountSchema } from '../schema';

export const createAccountAction = authActionClient
  .metadata({
    name: 'Create account action',
  })
  .schema(createAccountSchema)
  .action(
    async ({
      ctx: {
        user: { userId },
      },
      parsedInput: data,
    }) => {
      await database.account.create({
        data: {
          ...data,
          userId,
        },
      });
    }
  );
