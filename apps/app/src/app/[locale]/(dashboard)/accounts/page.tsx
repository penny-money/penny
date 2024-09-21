import { CreateAccountForm } from "@/components/forms/create-account-form";
import { getUserAccounts } from "@penny/supabase/queries";
import { Button } from "@penny/ui/button";

export default async function AccountsPage() {
  const { data } = await getUserAccounts();

  return (
    <div className="h-full flex items-center justify-center">
      {data && data.length ? (
        <ul>
          {data.map((account) => (
            <li key={account.id}>{account.name}</li>
          ))}
        </ul>
      ) : (
        <CreateAccountForm />
      )}
    </div>
  );
}
