"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

// placeholder function
export async function SubmitInterview(formData: FormData) {
  const supabase = await createClient();
  const selectedUsers = JSON.parse(formData.get("selectedUsers") as string);
  const timeSlot = formData.get("slot");
  const rusheeId = formData.get("rusheeId");
  const { data: users, error: usersError } = await supabase.getUsers;

  console.log("Creating interview with:", {
    selectedUsers,
    timeSlot,
    rusheeId,
  });
}
