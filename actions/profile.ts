"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(formData: FormData) {
  const supabase = await createClient();
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const user_id = formData.get("user_id") as string;

  if (!user_id) {
    throw new Error("User ID is required.");
  }

  const { error } = await supabase
    .from("profiles")
    .update({ first_name, last_name })
    .eq("id", user_id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/profile");

  return true;
}
