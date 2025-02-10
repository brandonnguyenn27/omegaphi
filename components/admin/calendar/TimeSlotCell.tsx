import React from "react";

import { format } from "date-fns";
import {
  UserAvailabilityScheduler,
  RusheeAvailabilityScheduler,
  InterviewDay,
} from "@/types/admin/types";
import SchedulePopover from "./SchedulePopover";

interface TimeSlotCellProps {
  isAvailable: boolean;
  rusheeAvailabilities: RusheeAvailabilityScheduler[];
  userAvailabilities: UserAvailabilityScheduler[];
  slot: Date;
  rusheeId: string;
  interviewDay: InterviewDay;
  scheduled: boolean;
}

const TimeSlotCell: React.FC<TimeSlotCellProps> = ({
  isAvailable,
  rusheeAvailabilities,
  userAvailabilities,
  slot,
  rusheeId,
  interviewDay,
  scheduled,
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

  let bgColor = "bg-gray-100";
  if (scheduled) {
    bgColor = "bg-green-500";
  } else if (isAvailable) {
    bgColor = "bg-red-500 hover:bg-red-600";
  }

  return (
    <div
      key={`${rusheeId}-${slot}`}
      className={`border-b border-r border-gray-300 h-12 flex items-center justify-center text-xs transition-colors duration-200 ${bgColor}`}
      title={title}
    />
  );
};

export default TimeSlotCell;
