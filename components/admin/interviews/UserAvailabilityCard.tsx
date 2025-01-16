import { UserAvailability } from "@/types/admin/types";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import DeleteUserAvailabilityButton from "./DeleteUserAvailabilityButton";
interface UserAvailabilityCardProps {
  availability: UserAvailability;
}

export default function UserAvailabilityCard({
  availability,
}: UserAvailabilityCardProps) {
  const timeZone = "UTC";

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <p className="text-gray-600">
        {format(
          toZonedTime(new Date(availability.start_time), timeZone),
          "PPP"
        )}
      </p>
      <p className="text-lg font-semibold">
        {format(toZonedTime(new Date(availability.start_time), timeZone), "p")}{" "}
        - {format(toZonedTime(new Date(availability.end_time), timeZone), "p")}
      </p>
      <DeleteUserAvailabilityButton availability_id={availability.id} />
    </div>
  );
}
