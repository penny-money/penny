import { AccountCard } from '@/components/cards/account-card';
import { AccountSummaryCard } from '@/components/cards/account-summary-cards';
import { database as db } from '@repo/database';
import { CreateAccountForm } from '@/components/forms/create-account-form';
import { Suspense } from 'react';

const singleAccount = {
  name: 'MPESA: Line 1',
  description: 'My first MPESA line',
  currency: 'KES',
  currentAmount: 50000,
  previousAmount: 4000,
  institution: 'MPESA',
  accountNumber: '0703324573',
  labelColor: 'blue',
  category: 'Mobile Money',
};

export default function AccountsPage() {
  return (
    <div className="@container h-full space-y-6 border-b p-4">
      <div className="flex w-full items-center justify-end">
        <CreateAccountForm />
      </div>
      <div className="space-y-2">
        <h2 className="text-neutral-500 text-sm">Summary</h2>
        <div className="flex flex-wrap gap-2">
          <div className="grow">
            <Suspense
              fallback={
                <AccountSummaryCard {...fallbackSummary} variant="primary" />
              }
            >
              <BalanceSummary />
            </Suspense>
          </div>
          <div className="grow">
            <Suspense fallback={<AccountSummaryCard {...fallbackSummary} />}>
              <IncomeSummary />
            </Suspense>
          </div>
          <div className="grow">
            <Suspense fallback={<AccountSummaryCard {...fallbackSummary} />}>
              <ExpenseSummary />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-neutral-500 text-sm">All accounts.</h2>
        <div className="flex flex-wrap gap-2">
          <div className="grow">
            <AccountCard {...singleAccount} />
          </div>
          <div className="grow">
            <AccountCard {...singleAccount} />
          </div>
          <div className="grow">
            <AccountCard {...singleAccount} />
          </div>
        </div>
      </div>
    </div>
  );
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
  // We're now assuming single currency
  const balance = await db.account.aggregate({
    _sum: {
      balance: true,
    },
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
    _sum: {
      amount: true,
    },
    where: {
      type: {
        in: ['INCOME'],
      },
    },
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
    _sum: {
      amount: true,
    },
    where: {
      type: {
        in: ['EXPENSE'],
      },
    },
  });

  return {
    title: 'Expense',
    description: 'Expenses for selected period',
    currency: 'KES',
    currentAmount: expense._sum.amount ?? 0,
    previousAmount: undefined,
  };
};

const fallbackSummary = {
  title: 'Loading...',
  description: 'Loading summary',
  currency: 'KES', // TODO: User's default currency
  currentAmount: 0,
  previousAmount: 0,
};
