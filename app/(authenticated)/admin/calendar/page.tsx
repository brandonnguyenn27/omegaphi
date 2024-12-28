import { createClient } from "@/utils/supabase/server";
import Scheduler from "@/components/admin/calendar/Calendar";

export default async function AdminCalendarPage() {
  const supabase = await createClient();
  const { data: interviews, error } = await supabase
    .from("interview_days")
    .select("*")
    .order("interview_date", { ascending: true });
  if (error) {
    console.error(error);
  }

  return (
    <section className="p-4">
      <h1 className="text-xl font-semibold mb-4">Interview Scheduler</h1>
      <Scheduler interviews={interviews ?? []} />
    </section>
  );
}
