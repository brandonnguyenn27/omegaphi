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
export async function addRusheeAvailability(formData: FormData) {
  const supabase = await createClient();

  const rushee_id = formData.get("rushee_id") as string;
  const start_time = formData.get("start_time") as string;
  const end_time = formData.get("end_time") as string;

  await supabase
    .from("rushee_availabilities")
    .insert({ rushee_id, start_time, end_time });
}
export async function deleteRusheeAvailability(rusheeId: string) {
  const supabase = await createClient();
  await supabase
    .from("rushee_availabilities")
    .delete()
    .eq("rushee_id", rusheeId);
}

export async function updateRusheeAvailability(payload: {
  id: string;
  rushee_id: string;
  start_time: string;
  end_time: string;
}) {
  const { id, ...fields } = payload;

  const supabase = await createClient();
  await supabase.from("rushee_availabilities").update(fields).eq("id", id);
}
