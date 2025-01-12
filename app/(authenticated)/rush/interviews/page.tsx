import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InterviewCard from "@/components/interviews/InterviewCard";
import { createClient } from "@/utils/supabase/server";
import { formatDate } from "@/utils/helper";
import { format, toZonedTime } from "date-fns-tz";
import AddUserAvailabilityModal from "@/components/admin/interviews/AddUserAvailabilityModal";
export default async function InterviewPage() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  const userId = user?.user?.id;

  const { data: dates } = await supabase
    .from("interview_days")
    .select("id, interview_date")
    .order("interview_date");

  const { data: interviews } = await supabase
    .from("interviews")
    .select("*")
    .eq("user_id", userId);

  const { data: userAvailabilities } = await supabase
    .from("user_availabilities")
    .select("*")
    .eq("user_id", userId);

  const timeZone = "UTC";

  return (
    <div>
      <h1 className="text-2xl font-bold">Interviews</h1>
      <AddUserAvailabilityModal userId={userId || ""} />
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
        <h1 className="text-2xl font-bold">Your Availabilities</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {userAvailabilities?.map((availability) => (
            <div
              key={availability.id}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <p className="text-gray-600">
                {format(
                  toZonedTime(new Date(availability.start_time), timeZone),
                  "PPP"
                )}
              </p>
              <p className="text-lg font-semibold">
                {format(
                  toZonedTime(new Date(availability.start_time), timeZone),
                  "p"
                )}{" "}
                -{" "}
                {format(
                  toZonedTime(new Date(availability.end_time), timeZone),
                  "p"
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
