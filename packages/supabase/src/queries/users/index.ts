import { logger } from "@penny/logger";
import { createClient } from "@penny/supabase/server";

export async function getUser() {
  const supabase = createClient();

  try {
    const result = await supabase.auth.getUser();
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
