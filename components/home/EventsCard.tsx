import { createClient } from "@/utils/supabase/server";
import { Event } from "@/types/admin/types";
import { formatTime } from "@/utils/helper";

export async function EventsCard() {
  const supabase = await createClient();

  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true })
    .returns<Event[]>();

  if (error) {
    console.error("Error fetching events:", error);
    return (
      <div className="bg-card rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        <div className="h-[600px] overflow-y-auto pr-2">
          <p className="text-red-500">Error loading events</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
      <div className="h-[600px] overflow-y-auto pr-2">
        {events && events.length > 0 ? (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="p-4 bg-muted rounded-md">
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(event.date).toLocaleDateString()} |{" "}
                  {formatTime(event.start_time)} - {formatTime(event.end_time)}
                </p>
                <p className="mt-2 text-sm">{event.description}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  📍 {event.location}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No upcoming events</p>
        )}
      </div>
    </div>
  );
}
