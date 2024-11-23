import { database } from '@repo/database';

export const POST = async () => {
  const newUser = await database.user.create({
    data: {
      clerkId: 'random-id',
    },
  });

  await database.user.delete({
    where: {
      id: newUser.id,
    },
  });

  return new Response('OK', { status: 200 });
};
