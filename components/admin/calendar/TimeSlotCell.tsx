import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";

interface TimeSlotCellProps {
  isAvailable: boolean;
  rusheeAvailabilities: Array<{ start_time: string; end_time: string }>;
  slot: string;
  rusheeId: string;
}

const TimeSlotCell: React.FC<TimeSlotCellProps> = ({
  isAvailable,
  rusheeAvailabilities,
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
    // Render interactive cell with popover
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
          <h3 className="font-semibold text-lg">Time Slot Details</h3>
          <p>
            This is a popover with details about availability for this time
            slot.
          </p>
        </PopoverContent>
      </Popover>
    );
  }

  // Render static non-interactive cell
  return (
    <div
      key={`${rusheeId}-${slot}`}
      className="border-b border-r border-gray-300 h-12 flex items-center justify-center text-xs bg-white hover:bg-gray-100 transition-colors duration-200"
      title={title}
    />
  );
};

export default TimeSlotCell;
