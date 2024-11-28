import { CreateBudgetForm } from '@/components/forms/create-budget-form';
import type { PropsWithChildren } from 'react';

export default function BudgetsPage() {
  return (
    <div className="h-full p-6">
      <BudgetsPageTopBar>
        <CreateBudgetForm />
      </BudgetsPageTopBar>
    </div>
  );
}

function BudgetsPageTopBar({ children }: PropsWithChildren) {
  return <div className="flex justify-end py-6">{children}</div>;
}
