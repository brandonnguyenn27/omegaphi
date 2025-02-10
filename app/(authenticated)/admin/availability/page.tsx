import UserAvailability from "@/components/availbility/UserAvailabilityGrid";
import { createClient } from "@/utils/supabase/server";
import { InterviewDay, UserAvailabilityExtended } from "@/types/admin/types";

export default async function AvailabilityPage() {
  const supabase = await createClient();
  const { data: interviewDays, error: interviewDaysError } = await supabase
    .from("interview_days")
    .select("*");
  if (interviewDaysError) {
    console.error(interviewDaysError);
  }
  const { data: userAvailabilities, error: userAvailabilitiesError } =
    await supabase.from("user_availabilities").select("*");
  if (userAvailabilitiesError) {
    console.error(userAvailabilitiesError);
  }

  return (
    <UserAvailability
      userAvailabilities={userAvailabilities || []}
      interviewDays={interviewDays || []}
    />
  );
}
