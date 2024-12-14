"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EventForm from "./EventForm";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

export default function EventList({ events }: { events: Event[] }) {
  const supabase = createClient();
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("events").delete().match({ id });

    if (error) {
      console.error("Error deleting event:", error);
      return;
    }

    // Refresh the page
    window.location.reload();
  };

  if (editingEvent) {
    return (
      <div>
        <Button
          variant="outline"
          onClick={() => setEditingEvent(null)}
          className="mb-4"
        >
          Cancel Edit
        </Button>
        <EventForm
          event={editingEvent}
          onComplete={() => setEditingEvent(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="border p-4 rounded">
          <h3 className="font-bold">{event.title}</h3>
          <p>{event.description}</p>
          <p>Date: {new Date(event.date).toLocaleString()}</p>
          <p>Location: {event.location}</p>
          <div className="mt-2 space-x-2">
            <Button variant="outline" onClick={() => setEditingEvent(event)}>
              Edit
            </Button>
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
