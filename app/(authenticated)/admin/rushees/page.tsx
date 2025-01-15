import { createClient } from "@/utils/supabase/server";
import AddRusheeModal from "./AddRusheeModal";
import RusheeCard from "@/components/admin/rushee/RusheeCard";
import RusheeAvailabilityCard from "@/components/admin/rushee/RusheeAvailabilityCard";
import SortDropdown from "@/components/admin/rushee/SortDropdown";

type Params = Promise<{}>;
type SearchParams = Promise<{ sort?: string }>;

interface RusheesPageProps {
  params: Params;
  searchParams: SearchParams;
}

interface SortOption {
  field: string;
  direction: "asc" | "desc";
}

export default async function RusheesPage(props: RusheesPageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const sortOption: SortOption =
    searchParams?.sort === "name"
      ? { field: "first_name", direction: "asc" }
      : searchParams?.sort === "oldest"
      ? { field: "created_at", direction: "asc" }
      : { field: "created_at", direction: "desc" };

  const supabase = await createClient();

  const { data: rushees, error } = await supabase
    .from("rushees")
    .select("*")
    .order(sortOption.field, { ascending: sortOption.direction === "asc" });

  if (error) {
    console.error("Error fetching rushees:", error);
  }

  const { data: rusheeAvailabilities, error: availabilityError } =
    await supabase.from("rushee_availabilities").select("*");
  if (availabilityError) {
    console.error("Error fetching rushee availabilities:", availabilityError);
  }

  return (
    <>
      <section className="p-4">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold mr-4">All Rushees</h1>
          <div className="flex items-center gap-4">
            <AddRusheeModal />
            <SortDropdown />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rushees?.map((rushee) => (
            <RusheeCard key={rushee.id} rushee={rushee} />
          ))}
        </div>
      </section>
      <section className="p-4">
        <h1 className="text-2xl font-bold m-4">All Rushee Availabilities</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {rusheeAvailabilities?.map((availability) => {
            const rushee = rushees?.find(
              (r) => r.id === availability.rushee_id
            );
            const rusheeName = rushee
              ? `${rushee.first_name} ${rushee.last_name}`
              : undefined;

            return (
              <RusheeAvailabilityCard
                key={availability.id}
                availability={availability}
                rusheeName={rusheeName}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
