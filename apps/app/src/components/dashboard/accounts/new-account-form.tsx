"use client";

import { createAccountAction } from "@/actions/account/create-account-action";
import { Button } from "@penny/ui/button";
import { Loader } from "@penny/ui/icons";
import { Input } from "@penny/ui/input";
import { Label } from "@penny/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@penny/ui/select";
import { useAction } from "next-safe-action/hooks";

interface NewAccountProps {
  closeDialog?: () => void;
}

export const NewAccountForm: React.FC<NewAccountProps> = ({ closeDialog }) => {
  const { execute, isPending } = useAction(createAccountAction, {
    onError: ({ error, input }) => {
      console.error(error);
      console.log(input);
    },
    onSuccess: () => closeDialog && closeDialog(),
  });

  return (
    <form
      action={execute}
      id="new-account-form"
      className="flex flex-col gap-4 py-4"
    >
      <div className="space-y-1">
        <Label htmlFor="name">Account name</Label>
        <Input type="text" name="name" id="name" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="account-number">Bank account number</Label>
        <Input type="text" name="account-number" id="account-number" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="type">Account type</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select the account type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="mobile-money">Mobile money</SelectItem>
            <SelectItem value="cash">Cash</SelectItem>
            <SelectItem value="current-account">Current account</SelectItem>
            <SelectItem value="credit-card">Credit card</SelectItem>
            <SelectItem value="saving-account">Saving account</SelectItem>
            <SelectItem value="mortgage">Mortgage</SelectItem>
            <SelectItem value="loan">Loan</SelectItem>
            <SelectItem value="investment">Investment</SelectItem>
            <SelectItem value="insurance">Insurance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="balance">Initial balance</Label>
        <Input type="number" step="0.01" name="balance" id="balance" />
      </div>

      <div className="mt-4">
        <Button disabled={isPending}>
          {isPending && <Loader className="animate-spin" />}
          <span>Create account</span>
        </Button>
      </div>
    </form>
  );
};
