import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InterviewCard from "@/components/interviews/InterviewCard";
import { createClient } from "@/utils/supabase/server";
import { formatDate } from "@/utils/helper";
import UserAvailabilityCard from "@/components/admin/interviews/UserAvailabilityCard";
import AddUserAvailabilityModal from "@/components/admin/interviews/AddUserAvailabilityModal";
export default async function InterviewPage() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  const userId = user?.user?.id;

  const { data: dates, error: datesError } = await supabase
    .from("interview_days")
    .select("id, interview_date")
    .order("interview_date");
  if (datesError) {
    console.error(datesError);
  }

  const { data: interviews, error: interviewsError } = await supabase
    .from("interviews")
    .select("*")
    .eq("user_id", userId);
  if (interviewsError) {
    console.error(interviewsError);
  }

  const { data: userAvailabilities, error: userAvailabilitiesError } =
    await supabase
      .from("user_availabilities")
      .select("*")
      .eq("user_id", userId);
  if (userAvailabilitiesError) {
    console.error(userAvailabilitiesError);
  }

  return (
    <div>
      <div className="flex mb-8">
        <h1 className="text-2xl font-bold mr-8">Interviews</h1>
        <AddUserAvailabilityModal
          userId={userId || ""}
          interview_dates={dates?.map((date) => date.interview_date) || []}
        />
      </div>
      <div className="flex justify-center items-center w-full">
        <Tabs defaultValue="interview1" className="w-3/4 ">
          <TabsList
            className="grid w-full gap-2"
            style={{
              gridTemplateColumns: `repeat(${
                dates?.length || 1
              }, minmax(0, 1fr))`,
            }}
          >
            {dates?.map((date, index) => {
              return (
                <TabsTrigger
                  asChild
                  key={index}
                  value={`interview${index + 1}`}
                >
                  <div>{formatDate(date.interview_date)}</div>
                </TabsTrigger>
              );
            })}
          </TabsList>
          {dates?.map((date, index) => (
            <TabsContent key={index} value={`interview${index + 1}`}>
              <InterviewCard
                interviews={
                  interviews?.filter(
                    (interview) => interview.interview_day_id === date.id
                  ) || []
                }
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <div>
        <h1 className="text-2xl font-bold mt-8 mb-2">Your Availabilities</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {userAvailabilities?.map((availability) => (
            <UserAvailabilityCard
              key={availability.id}
              availability={availability}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
