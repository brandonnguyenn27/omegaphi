"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

interface EventFormProps {
  event?: Event;
  onComplete?: () => void;
}

export default function EventForm({ event, onComplete }: EventFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  // Populate form with event data when editing
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description || "");
      // Convert date to local datetime-local format
      setDate(new Date(event.date).toISOString().slice(0, 16));
      setLocation(event.location || "");
    }
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const supabase = createClient();

    if (event?.id) {
      // Update existing event
      const { error } = await supabase
        .from("events")
        .update({
          title,
          description,
          date,
          location,
          updated_at: new Date().toISOString(),
        })
        .eq("id", event.id);

      if (error) {
        console.error("Error updating event:", error);
        return;
      }
    } else {
      // Create new event
      const { error } = await supabase.from("events").insert([
        {
          title,
          description,
          date,
          location,
        },
      ]);

      if (error) {
        console.error("Error creating event:", error);
        return;
      }
    }

    // Reset form
    setTitle("");
    setDescription("");
    setDate("");
    setLocation("");

    // Close modal and refresh
    if (onComplete) {
      onComplete();
    }
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
        />
      </div>

      <div>
        <label className="block mb-2">Date</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-2">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <Button type="submit">{event ? "Update Event" : "Create Event"}</Button>
    </form>
  );
}
