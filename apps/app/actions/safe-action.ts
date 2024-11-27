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
 * Ensures actions using this client are partialy authenticated by clerk and provides user context with clerkId
 */
export const clerkAuthClient = baseAction.use(async ({ next, metadata }) => {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error('Unauthorized');
  }

  return withServerActionInstrumentation(metadata.name, async () => {
    return await next({
      ctx: {
        user: {
          clerkId,
        },
      },
    });
  });
});

/**
 * Ensures actions using this client are fully authenticated by clerk and db and provides full user context
 */
export const fullAuthClient = clerkAuthClient.use(
  async ({ next, ctx, metadata }) => {
    const dbUser = await ctx.db.user.findUnique({
      where: { clerkId: ctx.user.clerkId },
    });

    if (!dbUser) {
      throw new Error('User not found');
    }

    return withServerActionInstrumentation(metadata.name, async () => {
      return await next({
        ctx: {
          user: {
            ...ctx.user,
            userId: dbUser?.id,
          },
        },
      });
    });
  }
);
