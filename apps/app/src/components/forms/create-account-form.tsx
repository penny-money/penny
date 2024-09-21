"use client";

import { createAccountAction } from "@/actions/account/create-account-action";
import { Button } from "@penny/ui/button";
import { Input } from "@penny/ui/input";
import { useAction } from "next-safe-action/hooks";

export const CreateAccountForm: React.FC = () => {
  const { execute } = useAction(createAccountAction);

  return (
    <form action={execute} className="flex flex-col w-full max-w-sm gap-2">
      <Input name="name" type="text" placeholder="Account name" />
      <Input name="type" type="text" placeholder="Type of account" />
      <Input name="balance" type="number" placeholder="Balance in account" />
      <Button>Create Account</Button>
    </form>
  );
};
