import { database } from '@repo/database';

export const POST = async () => {
  const newUser = await database.user.create({
    data: {
      name: 'cron tmp',
      email: 'test@test.com',
    },
  });

  await database.user.delete({
    where: {
      id: newUser.id,
    },
  });

  return new Response('OK', { status: 200 });
};
