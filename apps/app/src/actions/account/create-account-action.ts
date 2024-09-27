"use server";

import { authActionClient } from "@/actions/safe-action";
import { createAccount } from "@penny/supabase/mutations";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";

const createAccountSchema = zfd.formData({
  name: zfd.text(z.string()),
  "account-number": zfd.text(z.string().optional()),
  type: zfd.text(z.string().default("general")),
  balance: zfd.numeric(z.coerce.number().optional().default(0)),
});

export const createAccountAction = authActionClient
  .schema(createAccountSchema)
  .metadata({
    name: "create-account",
  })
  .action(async ({ parsedInput: input, ctx: { user } }) => {
    const result = await createAccount(user.id, input);

    revalidatePath("/accounts");
    return result;
  });
