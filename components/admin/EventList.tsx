"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import EditEventModal from "./EditEventModal";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

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
        <div key={event.id} className="border p-4 rounded">
          <h3 className="font-bold">{event.title}</h3>
          <p>{event.description}</p>
          <p>Date: {new Date(event.date).toLocaleString()}</p>
          <p>Location: {event.location}</p>
          <div className="mt-2 space-x-2">
            <EditEventModal event={event} />
            <Button
              variant="destructive"
              onClick={() => handleDelete(event.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
