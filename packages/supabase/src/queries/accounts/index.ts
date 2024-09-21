import { logger } from "@penny/logger";
import { createClient } from "@penny/supabase/server";

export async function getUserAccounts() {
  const supabase = createClient();

  try {
    return await supabase.from("accounts").select("*");
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
