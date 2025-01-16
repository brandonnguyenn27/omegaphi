"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  const { error } = await supabase
    .from("interview_days")
    .insert([{ title, interview_date, start_time, end_time }]);

  if (error) {
    throw new Error(error.message);
  }
  redirect("/admin/interview-dates");
  return;
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
  const interview_date = formData.get("date") as string;

  const { data: interviewDays, error: lookupError } = await supabase
    .from("interview_days")
    .select("id")
    .eq("interview_date", interview_date);

  if (lookupError) {
    throw new Error(lookupError.message);
  }
  if (!interviewDays || interviewDays.length === 0) {
    throw new Error("No interview day found for the specified date.");
  }

  const interview_day_id = interviewDays[0].id;

  const { data: existingAvailabilities, error: fetchError } = await supabase
    .from("user_availabilities")
    .select("start_time, end_time")
    .eq("user_id", user_id)
    .eq("interview_day_id", interview_day_id);

  if (fetchError) {
    throw new Error(fetchError.message);
  }
  console.log(existingAvailabilities);

  const newStart = new Date(String(start_time));
  const newEnd = new Date(String(end_time));

  for (const availability of existingAvailabilities || []) {
    const existingStart = new Date(String(availability.start_time));
    const existingEnd = new Date(String(availability.end_time));

    console.log("Comparing new availability: ", newStart, newEnd);
    console.log("With existing availability: ", existingStart, existingEnd);

    if (newStart < existingEnd && existingStart < newEnd) {
      console.log("Overlapping availability found: ", availability);
      throw new Error(
        "The provided time range overlaps with an existing availability."
      );
    }
  }

  const { data, error } = await supabase
    .from("user_availabilities")
    .insert([{ user_id, start_time, end_time, interview_day_id }]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/interviews");
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
  revalidatePath("/admin/interviews");
}
