import { createClient } from "@/utils/supabase/server";
import { isAdmin } from "@/utils/auth";
import AddEventModal from "@/components/admin/AddEventModal";
import EventList from "@/components/admin/EventList";

export default async function AdminEventsPage() {
  const isUserAdmin = await isAdmin();

  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("date");

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold mr-4">Event Management</h1>
        {isUserAdmin && <AddEventModal />}
      </div>
      <EventList events={events || []} isAdmin={isUserAdmin} />
    </div>
  );
}
