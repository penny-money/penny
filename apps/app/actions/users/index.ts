'use server';

import { database } from '@repo/database';
import { authActionClient } from '../safe-action';
import { userSchema } from '../schema';

const createDbUserSchema = userSchema.omit({
  id: true,
});

export const createDbUserAction = authActionClient
  .schema(createDbUserSchema)
  .action(async ({ parsedInput: data }) => {
    await database.user.create({ data });
  });
