"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
export async function deleteWhitelist(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("email_whitelist")
    .delete()
    .eq("id", id);
  if (error) console.error(error);
  revalidatePath("/admin/whitelist");
}

export async function addWhitelist(formData: FormData) {
  const email = formData.get("email") as string;
  const supabase = await createClient();
  const { error } = await supabase.from("email_whitelist").insert([{ email }]);
  if (error) console.error(error);
  revalidatePath("/admin/whitelist");
}
