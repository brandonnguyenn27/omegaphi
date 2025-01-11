import React from "react";
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

  return (
    <div
      key={`${rusheeId}-${slot}`}
      className={`border-b border-r border-gray-300 h-12 flex items-center justify-center text-xs ${
        isAvailable ? "bg-red-500 text-white" : "bg-white"
      }`}
      title={title}
    />
  );
};

export default TimeSlotCell;
