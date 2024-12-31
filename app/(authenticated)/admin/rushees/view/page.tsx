"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Use client-side Supabase client
import { useSearchParams } from "next/navigation";
import { Rushee } from "@/types/admin/types";
import { RusheeAvailability } from "@/types/admin/types";
import RusheeAvailabilityCard from "@/components/admin/rushee/RusheeAvailabilityCard";

export default function RusheePage() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const rusheeId = searchParams.get("rusheeId");
  const [rushee, setRushee] = useState<Rushee | null>(null);
  const [rusheeAvailibility, setRusheeAvailibility] = useState<
    RusheeAvailability[]
  >([]);

  useEffect(() => {
    const fetchRushee = async () => {
      if (rusheeId) {
        const { data: rushee, error } = await supabase
          .from("rushees")
          .select("*")
          .eq("id", rusheeId)
          .single();

        if (error) {
          console.error("Error fetching rushee:", error);
        } else {
          setRushee(rushee);
        }
      }
      const { data: rusheeAvailibility, error } = await supabase
        .from("rushee_availabilities")
        .select("*")
        .eq("rushee_id", rusheeId);

      if (error) {
        console.error("Error fetching rushee availibility:", error);
      } else {
        setRusheeAvailibility(rusheeAvailibility);
        console.log(rusheeAvailibility);
      }
    };

    fetchRushee();
  }, [rusheeId, supabase]);

  return (
    <div>
      {rushee ? (
        <div>
          <p className="font-bold text-2xl">
            {rushee.first_name} {rushee.last_name}
          </p>
          {rusheeAvailibility?.map((availibility) => (
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
