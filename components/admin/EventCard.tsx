import { Button } from "@/components/ui/button";
import EditEventModal from "./EditEventModal";
import { Event } from "@/types/admin/types";
import { formatTime } from "@/utils/helper";

interface EventCardProps {
  event: Event;
  onDelete: (id: string) => Promise<void>;
  isAdmin: boolean;
}

export default function EventCard({
  event,
  onDelete,
  isAdmin,
}: EventCardProps) {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString();

  return (
    <div className="border p-4 rounded">
      <h3 className="font-bold">{event.title}</h3>
      <p>{event.description}</p>
      <p>Date: {formattedDate}</p>
      <p>
        Time: {formatTime(event.start_time)} - {formatTime(event.end_time)}
      </p>
      <p>Location: {event.location}</p>
      {isAdmin && (
        <div className="mt-2 space-x-2">
          <EditEventModal event={event} />
          <Button variant="destructive" onClick={() => onDelete(event.id)}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
