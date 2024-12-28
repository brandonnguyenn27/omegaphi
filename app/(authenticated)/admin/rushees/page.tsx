import { createClient } from "@/utils/supabase/server";

import AddRusheeModal from "./AddRusheeModal";
import RusheeCard from "@/components/admin/rushee/RusheeCard";

export default async function RusheesPage() {
  const supabase = await createClient();

  const { data: rushees, error } = await supabase
    .from("rushees")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching rushees:", error);
  }

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Rushees</h1>

      <AddRusheeModal />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rushees?.map((rushee) => (
          <RusheeCard key={rushee.id} rushee={rushee} />
        ))}
      </div>
    </section>
  );
}
