import { AccountCard } from '@/components/cards/account-card';
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
    <div className="@container h-full @lg/main:p-4 @md/main:p-3 p-2">
      <AccountsPageTopBar>
        <CreateAccountForm />
      </AccountsPageTopBar>
      <div className="grid @2xl:grid-cols-7 grid-cols-1 gap-2">
        <div className="@2xl:col-span-3">
          <AccountSummaryCard variant="primary" {...summary} />
        </div>
        <div className="@2xl:col-span-2">
          <AccountSummaryCard {...summary} />
        </div>
        <div className="@2xl:col-span-2">
          <AccountSummaryCard {...summary} />
        </div>
      </div>
      <div className="mt-4 grid @2xl:grid-cols-3 @4xl:grid-cols-4 @lg:grid-cols-2 grid-cols-1 gap-2">
        <AccountCard {...singleAccount} />
        <AccountCard {...singleAccount} />
        <AccountCard {...singleAccount} />
        <AccountCard {...singleAccount} />
      </div>
    </div>
  );
}

function AccountsPageTopBar({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-end @md/main:p-3 p-2 @lg/main:py-4">
      {children}
    </div>
  );
}
