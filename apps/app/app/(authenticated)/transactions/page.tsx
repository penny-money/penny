import { database } from '@repo/database';
import { auth } from '@repo/auth/server';
import { CreateTransactionForm } from '@/components/forms/create-transaction-form';
import type { PropsWithChildren } from 'react';

async function getAccounts() {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  const user = await database.user.findUnique({
    where: { clerkId: userId },
    include: {
      accounts: {
        where: { isActive: true },
      },
    },
  });

  return user?.accounts ?? [];
}

export default async function TransactionsPage() {
  const accounts = await getAccounts();

  return (
    <div className="h-full p-6">
      <TransactionsPageTopBar>
        <CreateTransactionForm accounts={accounts} />
      </TransactionsPageTopBar>
    </div>
  );
}

function TransactionsPageTopBar({ children }: PropsWithChildren) {
  return <div className="flex justify-end py-6">{children}</div>;
}
