"use server";
import { createClient } from "@/utils/supabase/server";

export async function addRusheeAction(formData: FormData) {
  const supabase = await createClient();

  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  await supabase
    .from("rushees")
    .insert({ first_name, last_name, email, phone });
}

export async function deleteRusheeAction(rusheeId: string) {
  const supabase = await createClient();
  await supabase.from("rushees").delete().eq("id", rusheeId);
}

export async function updateRusheeAction(payload: {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
}) {
  const { id, ...fields } = payload;

  const supabase = await createClient();
  await supabase.from("rushees").update(fields).eq("id", id);
}
