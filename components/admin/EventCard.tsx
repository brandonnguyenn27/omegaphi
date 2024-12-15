import { Button } from "@/components/ui/button";
import EditEventModal from "./EditEventModal";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
}

interface EventCardProps {
  event: Event;
  onDelete: (id: string) => Promise<void>;
}

export default function EventCard({ event, onDelete }: EventCardProps) {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString();

  const formatTime = (timeStr: string | null | undefined) => {
    // Return early if timeStr is null or undefined
    if (!timeStr) return "";

    const [hours, minutes] = timeStr.split(":");
    const time = new Date();
    time.setHours(parseInt(hours), parseInt(minutes));
    return time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="border p-4 rounded">
      <h3 className="font-bold">{event.title}</h3>
      <p>{event.description}</p>
      <p>Date: {formattedDate}</p>
      <p>
        Time: {formatTime(event.start_time)} - {formatTime(event.end_time)}
      </p>
      <p>Location: {event.location}</p>
      <div className="mt-2 space-x-2">
        <EditEventModal event={event} />
        <Button variant="destructive" onClick={() => onDelete(event.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}
