import { createClient } from "@/utils/supabase/server";
import SortDropdown from "@/components/admin/rushee/SortDropdown";

import AddRusheeModal from "./AddRusheeModal";
import RusheeCard from "@/components/admin/rushee/RusheeCard";
interface SortOption {
  field: string;
  direction: "asc" | "desc";
}
export default async function RusheesPage({
  searchParams,
}: {
  searchParams?: { sort?: string };
}) {
  const supabase = await createClient();
  const sortOption: SortOption =
    searchParams?.sort === "name"
      ? { field: "first_name", direction: "asc" }
      : searchParams?.sort === "oldest"
      ? { field: "created_at", direction: "asc" }
      : { field: "created_at", direction: "desc" };

  const { data: rushees, error } = await supabase
    .from("rushees")
    .select("*")
    .order(sortOption.field, { ascending: sortOption.direction === "asc" });

  if (error) {
    console.error("Error fetching rushees:", error);
  }

  return (
    <section className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Rushees</h1>
        <div className="flex items-center gap-4">
          <SortDropdown />
          <AddRusheeModal />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rushees?.map((rushee) => (
          <RusheeCard key={rushee.id} rushee={rushee} />
        ))}
      </div>
    </section>
  );
}
