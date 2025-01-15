import { createClient } from "@/utils/supabase/server";
import DateCard from "@/components/admin/interview-dates/DateCard";

import AddInterviewDateModal from "@/components/admin/interview-dates/AddInterviewDateModal";
export default async function InterviewDatePage() {
  const supabase = await createClient();
  const { data: interviewDates, error } = await supabase
    .from("interview_days")
    .select("*")
    .order("interview_date", { ascending: true });

  if (error) {
    console.error(error);
  }

  return (
    <div>
      <div className="flex items-center  mb-4">
        <h1 className="text-xl font-semibold  mr-4">Interview Dates</h1>
        <AddInterviewDateModal />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {interviewDates?.map((date) => (
          <DateCard key={date.id} date={date} />
        ))}
      </div>
    </div>
  );
}
