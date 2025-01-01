import { createClient } from "@/utils/supabase/server";
import DateCard from "@/components/admin/interview-dates/DateCard";
import { InterviewDay } from "@/types/admin/types";
export default async function InterviewDatePage() {
  const supabase = await createClient();
  const { data: interviewDates, error } = (await supabase
    .from("interview_days")
    .select("*")
    .order("interview_date", { ascending: true })) as {
    data: InterviewDay[];
    error: any;
  };
  if (error) {
    console.error(error);
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Interview Dates</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {interviewDates?.map((date) => (
          <DateCard key={date.id} date={date} />
        ))}
      </div>
    </div>
  );
}
