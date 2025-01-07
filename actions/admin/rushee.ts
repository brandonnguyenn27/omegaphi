"use server";
import { revalidatePath } from "next/cache";

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
  revalidatePath("/admin/rushees");
}

export async function deleteRusheeAction(rusheeId: string) {
  const supabase = await createClient();
  await supabase.from("rushees").delete().eq("id", rusheeId);
}

export async function updateRusheeAction(
  rushee_id: string,
  formData: FormData
) {
  const supabase = await createClient();
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const email = formData.get("email") as string | null;
  const phone = formData.get("phone") as string | null;

  if (!first_name || !last_name) {
    throw new Error("First name and last name are required");
  }

  const updateData: { [key: string]: string | null } = {
    first_name,
    last_name,
  };

  if (email) {
    updateData.email = email;
  }

  if (phone) {
    updateData.phone = phone;
  }

  await supabase.from("rushees").update(updateData).eq("id", rushee_id);

  revalidatePath("/admin/rushees");
}
export async function addRusheeAvailability(formData: FormData) {
  const supabase = await createClient();

  const rushee_id = formData.get("rushee_id") as string;
  const start_time = formData.get("start_time") as string;
  const end_time = formData.get("end_time") as string;

  if (!rushee_id || !start_time || !end_time) {
    throw new Error("Missing required fields");
  }

  const { data, error } = await supabase
    .from("rushee_availabilities")
    .insert([{ rushee_id, start_time, end_time }]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/admin/rushees/view?rusheeId=${rushee_id}`);

  return data;
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
