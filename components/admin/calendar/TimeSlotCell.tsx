import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";

interface RusheeAvailability {
  id: string;
  start_time: string;
  end_time: string;
  rushees: {
    first_name: string;
    last_name: string;
  };
}

interface UserAvailability {
  id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  profiles: {
    first_name: string;
    last_name: string;
  };
}

interface TimeSlotCellProps {
  isAvailable: boolean;
  rusheeAvailabilities: RusheeAvailability[];
  userAvailabilities: UserAvailability[];
  slot: string;
  rusheeId: string;
}

const TimeSlotCell: React.FC<TimeSlotCellProps> = ({
  isAvailable,
  rusheeAvailabilities,
  userAvailabilities,
  slot,
  rusheeId,
}) => {
  const title = isAvailable
    ? rusheeAvailabilities
        .map(
          (a) =>
            `Available: ${format(new Date(a.start_time), "p")} - ${format(
              new Date(a.end_time),
              "p"
            )}`
        )
        .join("\n")
    : "";

  if (isAvailable) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div
            key={`${rusheeId}-${slot}`}
            className="border-b border-r border-gray-300 h-12 flex items-center justify-center text-xs transition-colors duration-200 bg-red-500 text-white hover:bg-red-600 cursor-pointer"
            title={title}
          ></div>
        </PopoverTrigger>
        <PopoverContent className="p-4 max-w-sm">
          <h3 className="font-semibold text-lg mb-2">Time Slot Details</h3>

          {userAvailabilities.length > 0 ? (
            <>
              <p className="mb-4">Brothers available in this timeslot:</p>
              <ul className="space-y-2">
                {userAvailabilities.map((ua) => (
                  <li key={ua.id} className="flex items-center space-x-2">
                    <input type="checkbox" id={`user-${ua.id}`} />
                    <label htmlFor={`user-${ua.id}`}>
                      {ua.profiles.first_name} {ua.profiles.last_name}
                    </label>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No brothers available in this timeslot.</p>
          )}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <div
      key={`${rusheeId}-${slot}`}
      className="border-b border-r border-gray-300 h-12 flex items-center justify-center text-xs bg-white hover:bg-gray-100 transition-colors duration-200"
      title={title}
    />
  );
};

export default TimeSlotCell;
