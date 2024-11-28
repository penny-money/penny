import { AccountSummaryCard } from '@/components/cards/account-summary-cards';
import { CreateAccountForm } from '@/components/forms/create-account-form';
import type { PropsWithChildren } from 'react';

const summary = {
  title: 'Balance',
  description: 'Your current balance from currently selected accounts',
  currency: 'KES',
  currentAmount: 100_000.0,
  previousAmount: 125_000.0,
};

export default function AccountsPage() {
  return (
    <div className="h-full p-6">
      <AccountsPageTopBar>
        <CreateAccountForm />
      </AccountsPageTopBar>
      <div className="flex flex-wrap gap-4">
        <AccountSummaryCard variant="primary" {...summary} />
        <div className="flex flex-auto flex-nowrap gap-4">
          <AccountSummaryCard
            {...{
              ...summary,
              title: 'Income',
              currentAmount: 185000,
              previousAmount: 175000,
            }}
          />
          <AccountSummaryCard
            {...{
              ...summary,
              title: 'Expenses',
              currentAmount: 85000,
              previousAmount: 50000,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function AccountsPageTopBar({ children }: PropsWithChildren) {
  return <div className="flex justify-end py-6">{children}</div>;
}
