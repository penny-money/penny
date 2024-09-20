"use client";

import { Button } from "@penny/ui/button";
import { Input } from "@penny/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { joinListAction } from "../actions/join-list-action";

export const JoinListForm: React.FC = () => {
  const [state, formAction] = useFormState(joinListAction, { message: "" });

  return (
    <div className="flex flex-col gap-2">
      <form
        action={formAction}
        className="flex flex-col md:flex-row md:items-center gap-3"
      >
        <Input name="email" type="email" placeholder="email@yako.com" />
        <FormButton />
      </form>
      {state.message && (
        <p className="text-xs text-secondary-foreground/80 max-w-[54ch]">
          {state.message}
        </p>
      )}
    </div>
  );
};

const FormButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending ? "Adding you to the list" : "Join the waitlist"}
    </Button>
  );
};
