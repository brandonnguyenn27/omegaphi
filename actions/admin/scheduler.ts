"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

// placeholder function
export async function SubmitInterview(formData: FormData) {
  const selectedUsers = JSON.parse(formData.get("selectedUsers") as string);
  const timeSlot = formData.get("slot");
  const rusheeId = formData.get("rusheeId");
  console.log("Creating interview with:", {
    selectedUsers,
    timeSlot,
    rusheeId,
  });
}
