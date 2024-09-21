import { logger } from "@penny/logger";
import { createClient } from "@penny/supabase/server";
import type { TablesInsert } from "@/types";

export async function createAccount(
  userId: TablesInsert<"accounts">["user_id"],
  data: TablesInsert<"accounts">,
) {
  const supabase = createClient();

  try {
    return await supabase
      .from("accounts")
      .insert({ ...data, user_id: userId })
      .select();
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
