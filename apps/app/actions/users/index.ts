'use server';

import { clerkAuthClient } from '../safe-action';
import { userSchema } from '../schema';

const createDbUserSchema = userSchema.omit({
  id: true,
});

export const createDbUserAction = clerkAuthClient
  .metadata({
    name: 'create-db-user',
  })
  .schema(createDbUserSchema)
  .action(async ({ parsedInput: data, ctx }) => {
    await ctx.db.user.upsert({
      create: data,
      update: data,
      where: {
        clerkId: ctx.user.clerkId,
      },
    });
  });
