import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InterviewCard from "@/components/interviews/InterviewCard";
import { createClient } from "@/utils/supabase/server";
import { formatDate } from "@/utils/helper";
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

  return (
    <div>
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
                <TabsTrigger key={index} value={`interview${index + 1}`}>
                  {formatDate(date.interview_date)}
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
    </div>
  );
}
