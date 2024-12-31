import { createClient } from "@/utils/supabase/server";
import { Rushee } from "@/types/admin/types";
import { RusheeAvailability } from "@/types/admin/types";
import RusheeAvailabilityCard from "@/components/admin/rushee/RusheeAvailabilityCard";

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
  const { rushee, availabilities } = await fetchRusheeData(rusheeId);
  return (
    <div>
      {rushee ? (
        <div>
          <p className="font-bold text-2xl">
            {rushee.first_name} {rushee.last_name}
          </p>
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