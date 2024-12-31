import { createClient } from "@/utils/supabase/server";
import Scheduler from "@/components/admin/calendar/Calendar";
import { AvailabilityExtended } from "@/types/admin/types";

export default async function AdminCalendarPage() {
  const supabase = await createClient();
  const { data: interviews, error } = await supabase
    .from("interview_days")
    .select("*")
    .order("interview_date", { ascending: true });
  if (error) {
    console.error(error);
  }
  const { data: availabilities, error: availabilityError } = await supabase
    .from("rushee_availabilities")
    .select(
      `
    id,
    rushee_id,
    start_time,
    end_time,
    created_at,
    updated_at,
    rushees (
      first_name,
      last_name
    )
  `
    )
    .order("start_time", { ascending: true });
  console.log(availabilities);
  return (
    <section className="p-4">
      <h1 className="text-xl font-semibold mb-4">Interview Scheduler</h1>
      <Scheduler
        interviews={interviews || []}
        availabilities={availabilities || []}
      />
    </section>
  );
}
