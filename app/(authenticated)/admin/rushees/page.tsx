import { createClient } from "@/utils/supabase/server";
import AddRusheeModal from "./AddRusheeModal";
import RusheeCard from "@/components/admin/rushee/RusheeCard";
import RusheeAvailabilityCard from "@/components/admin/rushee/RusheeAvailabilityCard";
import SortDropdown from "@/components/admin/rushee/SortDropdown";
import AvailabilitySortDropdown from "@/components/admin/rushee/RusheeAvailabilityDropdown";
type SearchParams = Promise<{
  sort?: string; // For rushees
  availabilitySort?: string; // For availabilities
}>;

interface SortOption {
  field: string;
  direction: "asc" | "desc";
}

export default async function RusheesPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;

  const sortOption: SortOption =
    searchParams?.sort === "name"
      ? { field: "first_name", direction: "asc" }
      : searchParams?.sort === "oldest"
      ? { field: "created_at", direction: "asc" }
      : { field: "created_at", direction: "desc" };

  const availabilitySort = searchParams?.availabilitySort;
  let availabilitySortOption: { field: string; ascending: boolean } = {
    field: "created_at", // default sort field
    ascending: false,
  };

  if (availabilitySort === "name-asc") {
    availabilitySortOption = { field: "rushees.first_name", ascending: true };
  } else if (availabilitySort === "name-desc") {
    availabilitySortOption = { field: "rushees.first_name", ascending: false };
  } else if (availabilitySort === "date-asc") {
    availabilitySortOption = { field: "start_time", ascending: true };
  } else if (availabilitySort === "date-desc") {
    availabilitySortOption = { field: "start_time", ascending: false };
  }

  const supabase = await createClient();

  const { data: rushees, error } = await supabase
    .from("rushees")
    .select("*")
    .order(sortOption.field, { ascending: sortOption.direction === "asc" });

  if (error) {
    console.error("Error fetching rushees:", error);
  }

  let availabilityQuery = supabase
    .from("rushee_availabilities")
    .select("*, rushees(first_name, last_name)");

  if (availabilitySortOption.field.startsWith("rushees.")) {
    const [_, relatedField] = availabilitySortOption.field.split(".");
    availabilityQuery = availabilityQuery.order(relatedField, {
      foreignTable: "rushees",
      ascending: availabilitySortOption.ascending,
    });
  } else {
    availabilityQuery = availabilityQuery.order(availabilitySortOption.field, {
      ascending: availabilitySortOption.ascending,
    });
  }

  const { data: rusheeAvailabilities, error: availabilityError } =
    await availabilityQuery;
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
        <div className="flex items-center">
          <h1 className="text-2xl font-bold m-4">All Rushee Availabilities</h1>
          <AvailabilitySortDropdown />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {rusheeAvailabilities?.map((availability) => {
            const { rushees: rushee, start_time, end_time, id } = availability;
            const rusheeName = rushee
              ? `${rushee.first_name} ${rushee.last_name}`
              : "Unknown";

            return (
              <RusheeAvailabilityCard
                key={id}
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
