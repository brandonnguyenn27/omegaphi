"use server";

import { createClient } from "@/utils/supabase/server";
import { Rushee } from "@/types/admin/types";
import { addMinutes, parseISO } from "date-fns";

export async function SubmitInterview(formData: FormData) {
  const supabase = await createClient();

  const selectedUsers = JSON.parse(formData.get("selectedUsers") as string);
  const timeSlot = formData.get("slot") as string;
  const rusheeId = formData.get("rusheeId");
  const interviewDayId = formData.get("interviewDay");

  const { data: brothers, error: brothersError } = await supabase
    .from("profiles")
    .select("*")
    .in("id", selectedUsers);
  if (brothersError) {
    console.error(brothersError);
    return;
  }

  const { data: rusheeData, error: rusheeError } = await supabase
    .from("rushees")
    .select("*")
    .eq("id", rusheeId)
    .single();
  const rushee: Rushee = rusheeData as Rushee;
  if (rusheeError) {
    console.error(rusheeError);
    return;
  }

  if (!Array.isArray(brothers) || brothers.length !== 2) {
    console.error("Validation error: Expected exactly two brothers");
    return;
  }

  if (!rushee) {
    console.error("Validation error: Rushee not found");
    return;
  }

  const [brother1, brother2] = brothers;

  const start_time = parseISO(timeSlot);
  const end_time = addMinutes(start_time, 30);

  const interviewRows = [
    {
      user_id: brother1.id,
      interviewee_name: `${rushee.first_name} ${rushee.last_name}`,
      partner_name: `${brother2.first_name} ${brother2.last_name}`,
      start_time: start_time.toISOString(),
      end_time: end_time.toISOString(),
      interview_day_id: interviewDayId,
    },
    {
      user_id: brother2.id,
      interviewee_name: `${rushee.first_name} ${rushee.last_name}`,
      partner_name: `${brother1.first_name} ${brother1.last_name}`,
      start_time: start_time.toISOString(),
      end_time: end_time.toISOString(),
      interview_day_id: interviewDayId,
    },
  ];

  const { error: interviewError } = await supabase
    .from("interviews")
    .insert(interviewRows);
  if (interviewError) {
    console.error("Error inserting interviews:", interviewError);
    return;
  }
  console.log(
    "Successfully inserted interviews for rushee",
    rushee.id,
    "Brothers: ",
    brother1.id,
    brother2.id,
    "At timeslot ",
    start_time
  );

  return;
}
