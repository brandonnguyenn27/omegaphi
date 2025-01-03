"use server";
import { createClient } from "@/utils/supabase/server";

export async function addInterviewDateAction(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const interview_date = formData.get("interview_date") as string;
  const start_time = formData.get("start_time") as string;
  const end_time = formData.get("end_time") as string;

  const { data: existingDates, error: checkError } = await supabase
    .from("interview_days")
    .select("id")
    .eq("interview_date", interview_date);

  if (checkError) {
    throw new Error(checkError.message);
  }

  if (existingDates && existingDates.length > 0) {
    throw new Error("An interview date with this date already exists.");
  }

  // Insert the new interview date
  const { data, error } = await supabase
    .from("interview_days")
    .insert([{ title, interview_date, start_time, end_time }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteInterviewDateAction(interviewId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("interview_days")
    .delete()
    .eq("id", interviewId);
  if (error) {
    throw new Error(error.message);
  }
}

export async function addUserAvailabilityAction(formData: FormData) {
  const supabase = await createClient();
  const user_id = formData.get("user_id") as string;
  const start_time = formData.get("start_time") as string;
  const end_time = formData.get("end_time") as string;
  const interview_day_id = formData.get("interview_day_id") as string;

  const { data, error } = await supabase
    .from("user_availabilities")
    .insert([{ user_id, start_time, end_time, interview_day_id }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteUserAvailabilityAction(availabilityId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("user_availabilities")
    .delete()
    .eq("id", availabilityId);
  if (error) {
    throw new Error(error.message);
  }
}
