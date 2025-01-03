import { Button } from "@/components/ui/button";
import { UserAvailability } from "@/types/admin/types";
import { format } from "date-fns";

interface UserAvailabilityCardProps {
  availability: UserAvailability;
  onDelete: (id: string) => Promise<void>;
}

export default function UserAvailabilityCard({
  availability,
  onDelete,
}: UserAvailabilityCardProps) {
  const startTime = new Date(availability.start_time);
  const endTime = new Date(availability.end_time);
  const formattedStartTime = format(startTime, "HH:mm");
  const formattedEndTime = format(endTime, "HH:mm");

  return (
    <div className="border p-4 rounded">
      <p>
        Time: {formattedStartTime} - {formattedEndTime}
      </p>
      <div className="mt-2 space-x-2">
        <Button variant="destructive" onClick={() => onDelete(availability.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}
