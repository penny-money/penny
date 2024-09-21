"use server";

import { authActionClient } from "@/actions/safe-action";
import { createAccount } from "@penny/supabase/mutations";
import { z } from "zod";
import { zfd } from "zod-form-data";

const createAccountSchema = zfd.formData({
  name: zfd.text(z.string()),
  type: zfd.text(z.string().optional()),
  balance: zfd.numeric(z.coerce.number().optional()),
});

export const createAccountAction = authActionClient
  .schema(createAccountSchema)
  .metadata({
    name: "create-account",
  })
  .action(async ({ parsedInput: input, ctx: { user } }) => {
    const result = await createAccount(user.id, input);

    return result;
  });
