"use server";

import { revalidatePath } from "next/cache";

export async function joinListAction(
  _prevState: { message: string },
  formData: FormData,
) {
  const email = formData.get("email") as string | null;

  console.log(email);

  if (!email || !email.includes("@")) {
    return { message: "Please enter a valid email" };
  }

  //TODO: Send email to db
  revalidatePath("/");

  return { message: `Action received the email ${email}` };
}
