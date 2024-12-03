import { AccountSummaryCard } from '@/components/cards/account-summary-cards';
import { CreateAccountForm } from '@/components/forms/create-account-form';
import { accountColumns } from '@/components/tables/columns/accounts';
import { AccountsTable } from '@/components/tables/filters/accounts';
import { database as db } from '@repo/database';

export const dynamic = 'force-dynamic';

export default async function AccountsPage() {
  const accounts = await getAccounts();

  return (
    <div className="@container h-full space-y-6 border-b p-4">
      <div className="flex w-full items-center justify-end">
        <CreateAccountForm />
      </div>
      <div className="space-y-2">
        <h2 className="text-neutral-500 text-sm">Summary</h2>
        <div className="flex flex-wrap gap-2">
          <div className="grow">
            <BalanceSummary />
          </div>
          <div className="grow">
            <IncomeSummary />
          </div>
          <div className="grow">
            <ExpenseSummary />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-neutral-500 text-sm">All accounts.</h2>
        <AccountsTable columns={accountColumns} data={accounts} />
      </div>
    </div>
  );
}

async function getAccounts() {
  return await db.account.findMany({
    orderBy: [{ updatedAt: 'desc' }],
  });
}

async function BalanceSummary() {
  const summary = await getBalanceSummary();
  return <AccountSummaryCard variant="primary" {...summary} />;
}

async function IncomeSummary() {
  const income = await getIncomeSummary();
  return <AccountSummaryCard {...income} />;
}

async function ExpenseSummary() {
  const expense = await getExpenseSummary();
  return <AccountSummaryCard {...expense} />;
}

const getBalanceSummary = async () => {
  // BUG: The aggregate balance doesn't consider currencies of the accounts!
  const balance = await db.account.aggregate({
    _sum: { balance: true },
    where: { isActive: true },
  });

  return {
    title: 'Balance',
    description: 'Current balance from selected accounts',
    currentAmount: balance._sum.balance ?? 0,
    currency: 'KES',
    previousAmount: undefined,
  };
};

const getIncomeSummary = async () => {
  const income = await db.transaction.aggregate({
    _sum: { amount: true },
    where: { type: { in: ['INCOME'] }, account: { isActive: true } },
  });

  return {
    title: 'Income',
    description: 'Income for selected period',
    currency: 'KES',
    currentAmount: income._sum.amount ?? 0,
    previousAmount: undefined,
  };
};

const getExpenseSummary = async () => {
  const expense = await db.transaction.aggregate({
    _sum: { amount: true },
    where: { type: { in: ['EXPENSE'] }, account: { isActive: true } },
  });

  return {
    title: 'Expense',
    description: 'Expenses for selected period',
    currency: 'KES',
    currentAmount: expense._sum.amount ?? 0,
    previousAmount: undefined,
  };
};
