import { z } from "zod";

export const createAccountSchema = z.object({
  user_id: z.string(),
  name: z.string(),
  type: z.string().optional(),
  balance: z.number().optional(),
});
