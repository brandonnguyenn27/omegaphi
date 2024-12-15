"use client";

import { createClient } from "@/utils/supabase/client";
import EventCard from "./EventCard";
import { Event } from "@/types/admin/types";

export default function EventList({ events }: { events: Event[] }) {
  const supabase = createClient();

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("events").delete().match({ id });

    if (error) {
      console.error("Error deleting event:", error);
      return;
    }

    // Refresh the page
    window.location.reload();
  };

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onDelete={handleDelete} />
      ))}
    </div>
  );
}
