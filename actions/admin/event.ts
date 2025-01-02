"use server";
import { createClient } from "@/utils/supabase/server";
export async function AddEventAction(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const start_time = formData.get("start_time") as string;
  const end_time = formData.get("end_time") as string;
  const location = formData.get("location") as string;

  const { data, error } = await supabase
    .from("events")
    .insert([{ title, description, date, start_time, end_time, location }]);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function DeleteEventAction(eventId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("events").delete().eq("id", eventId);
  if (error) {
    throw new Error(error.message);
  }
}

export async function UpdateEventAction(eventId: string, formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const start_time = formData.get("start_time") as string;
  const end_time = formData.get("end_time") as string;
  const location = formData.get("location") as string;

  const { data, error } = await supabase
    .from("events")
    .update({ title, description, date, start_time, end_time, location })
    .eq("id", eventId);
  if (error) {
    throw new Error(error.message);
  }
  console.log("updated event", data);
  return data;
}
