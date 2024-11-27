'use server';

import { authActionClient } from '../safe-action';
import { userSchema } from '../schema';

const createDbUserSchema = userSchema.omit({
  id: true,
});

export const createDbUserAction = authActionClient
  .schema(createDbUserSchema)
  .action(async ({ parsedInput: data, ctx }) => {
    await ctx.db.user.create({ data });
  });
