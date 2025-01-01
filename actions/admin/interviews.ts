"use server";
import { createClient } from "@/utils/supabase/server";

export async function addInterviewDateAction(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const interview_date = formData.get("interview_date") as string;
  const start_time = formData.get("start_time") as string;
  const end_time = formData.get("end_time") as string;

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
