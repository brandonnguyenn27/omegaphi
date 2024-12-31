"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Use client-side Supabase client
import { useSearchParams } from "next/navigation";

export default function RusheePage() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const rusheeId = searchParams.get("rusheeId");
  const [rushee, setRushee] = useState(null);

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
    };

    fetchRushee();
  }, [rusheeId, supabase]);

  return (
    <div>
      <p>Testing</p>
      {rushee ? (
        <div>
          <p>First Name: {rushee.first_name}</p>
          <p>Last Name: {rushee.last_name}</p>
          <p>Email: {rushee.email}</p>
          <p>Phone: {rushee.phone}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
