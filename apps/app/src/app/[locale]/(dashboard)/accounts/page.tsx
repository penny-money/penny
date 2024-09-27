import { NewAccountFlow } from "@/components/dashboard/accounts/new-account-flow";
import { getUserAccounts } from "@penny/supabase/queries";

export default async function AccountsPage() {
  const { data } = await getUserAccounts();

  return (
    <div className="h-full flex flex-col">
      <div className="grow flex items-center justify-center relative">
        {!data?.length ? (
          <NewAccountFlow firstAccount />
        ) : (
          <>
            <div className="absolute top-2 right-2">
              <NewAccountFlow />
            </div>
            <pre>
              <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
          </>
        )}
      </div>
      <div className="h-1/3 border-t"></div>
    </div>
  );
}
