"use client";

import EventCard from "./EventCard";
import { Event } from "@/types/admin/types";
import { DeleteEventAction } from "@/actions/admin/event";
import { useRouter } from "next/navigation";

interface EventListProps {
  events: Event[];
  isAdmin: boolean;
}

export default function EventList({ events, isAdmin }: EventListProps) {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    await DeleteEventAction(id);
    router.refresh();
  };

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          isAdmin={isAdmin}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
