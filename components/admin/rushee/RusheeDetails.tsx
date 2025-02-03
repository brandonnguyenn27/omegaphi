import { createClient } from "@/utils/supabase/server";
import { Rushee } from "@/types/admin/types";
import { RusheeAvailability } from "@/types/admin/types";
import RusheeAvailabilityCard from "@/components/admin/rushee/RusheeAvailabilityCard";
import AddAvailabilityModal from "@/components/admin/rushee/AddAvailabilityModal";

async function fetchRusheeData(rusheeId: string) {
  const supabase = await createClient();

  const { data: rushee, error: rusheeError } = await supabase
    .from("rushees")
    .select("*")
    .eq("id", rusheeId)
    .single();

  const { data: availabilities, error: availabilitiesError } = await supabase
    .from("rushee_availabilities")
    .select("*")
    .eq("rushee_id", rusheeId);

  if (rusheeError || availabilitiesError) {
    console.error(rusheeError || availabilitiesError);
    return { rushee: null, availabilities: [] };
  }

  return {
    rushee: rushee as Rushee,
    availabilities: availabilities as RusheeAvailability[],
  };
}

export default async function RusheeDetails({
  rusheeId,
}: {
  rusheeId: string;
}) {
  const supabase = await createClient();
  const { rushee, availabilities } = await fetchRusheeData(rusheeId);
  const { data: interview_dates, error: datesError } = await supabase
    .from("interview_days")
    .select("id, interview_date")
    .order("interview_date");
  if (datesError) {
    console.error(datesError);
  }
  return (
    <div>
      {rushee ? (
        <div>
          <div className="flex justify-between">
            <p className="font-bold text-2xl mb-4">
              {rushee.first_name} {rushee.last_name}
            </p>
            <AddAvailabilityModal
              rusheeId={rusheeId}
              interview_dates={
                interview_dates?.map((date) => date.interview_date) || []
              }
            />
          </div>
          {availabilities?.map((availibility) => (
            <RusheeAvailabilityCard
              key={availibility.id}
              availability={availibility}
            />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
