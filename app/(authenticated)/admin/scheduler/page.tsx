import { createClient } from "@/utils/supabase/server";
import Scheduler from "@/components/admin/calendar/Scheduler";
import {
  AvailabilityExtended,
  UserAvailabilityExtended,
  Interview,
} from "@/types/admin/types";

export default async function AdminCalendarPage() {
  const supabase = await createClient();

  const { data: interviews, error } = await supabase
    .from("interview_days")
    .select("*")
    .order("interview_date", { ascending: true });
  if (error) {
    console.error(error);
  }
  const { data: rawAvailabilities, error: availabilityError } = await supabase
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
  if (availabilityError) console.error(availabilityError);

  const availabilities: AvailabilityExtended[] = (rawAvailabilities || []).map(
    (a) => ({
      ...a,
      rushees: Array.isArray(a.rushees) ? a.rushees[0] : a.rushees,
      is_scheduled: false, // or set this based on your logic
    })
  );

  const { data: rawUserAvailabilities, error: userAvailError } = await supabase
    .from("user_availabilities")
    .select(
      `
      id,
      user_id,
      start_time,
      end_time,
      profiles ( first_name, last_name )
    `
    )
    .order("start_time", { ascending: true });
  if (userAvailError) console.error(userAvailError);
  const userAvailabilities: UserAvailabilityExtended[] = (
    rawUserAvailabilities || []
  ).map((ua) => ({
    ...ua,
    profiles: Array.isArray(ua.profiles) ? ua.profiles[0] : ua.profiles,
  }));

  const { data: rawInterviews, error: interviewsError } = await supabase
    .from("interviews")
    .select("*");
  if (interviewsError) {
    console.error(interviewsError);
  }

  const uniqueInterviews: Interview[] = Object.values(
    (rawInterviews || []).reduce(
      (acc: Record<string, Interview>, iv: Interview) => {
        if (!acc[iv.rushee_id]) {
          acc[iv.rushee_id] = iv;
        }
        return acc;
      },
      {}
    )
  );

  return (
    <section className="p-4">
      <h1 className="text-xl font-semibold mb-4">Interview Scheduler</h1>
      <Scheduler
        interviewDays={interviews || []}
        availabilities={availabilities || []}
        userAvailabilities={userAvailabilities || []}
        interviews={uniqueInterviews || []}
      />
    </section>
  );
}
