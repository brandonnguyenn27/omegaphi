import { createClient } from "@/utils/supabase/server";
import { isAdmin } from "@/utils/auth";
import { redirect } from "next/navigation";
import EventForm from "@/components/admin/EventForm";
import EventList from "@/components/admin/EventList";

export default async function AdminEventsPage() {
  const isUserAdmin = await isAdmin();

  if (!isUserAdmin) {
    redirect("/");
  }

  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("date");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Event Management</h1>
      <EventForm />
      <EventList events={events || []} />
    </div>
  );
}
