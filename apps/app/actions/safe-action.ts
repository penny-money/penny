import { auth } from '@repo/auth/server';
import { database } from '@repo/database';
import { withServerActionInstrumentation } from '@sentry/nextjs';
import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';

/**
 * Defines the metadata schema and adds the database to the context of the actions
 */
const baseAction = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
    });
  },
}).use(async ({ next }) => {
  return await next({
    ctx: {
      db: database,
    },
  });
});

/**
 * Ensures actions using this client are authenticated and provides user context
 */
export const authActionClient = baseAction.use(
  async ({ next, metadata, ctx }) => {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      throw new Error('Unauthorized');
    }

    const dbUser = await ctx.db.user.findUnique({
      where: { clerkId },
    });

    if (!dbUser) {
      throw new Error('User not found in database');
    }

    return withServerActionInstrumentation(metadata.name, async () => {
      return await next({
        ctx: {
          user: {
            clerkId,
            userId: dbUser.id,
          },
        },
      });
    });
  }
);
