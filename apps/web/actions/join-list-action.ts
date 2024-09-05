"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@penny/supabase/server";

export async function joinListAction(
  _prevState: { message: string },
  formData: FormData,
) {
  const email = formData.get("email") as string | null;

  if (!email || !email.includes("@")) {
    return { message: "Please enter a valid email" };
  }

  const sb = createClient();

  const { data, error } = await sb.from("waitlist").insert({ email }).select();

  if (error) return { message: error.message };

  revalidatePath("/");

  return {
    message: `Successfully joined the waitlist using the email ${data[0]?.email ?? email}. Keep an eye for an update from Penny. Thank you`,
  };
}
