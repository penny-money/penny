import { CreateAccountForm } from '@/components/forms/create-account-form';
import type { PropsWithChildren } from 'react';

export default function AccountsPage() {
  return (
    <div className="h-full p-6">
      <AccountsPageTopBar>
        <CreateAccountForm />
      </AccountsPageTopBar>
    </div>
  );
}

function AccountsPageTopBar({ children }: PropsWithChildren) {
  return <div className="flex justify-end py-6">{children}</div>;
}
