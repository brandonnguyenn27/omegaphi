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
}

const TimeSlotCell: React.FC<TimeSlotCellProps> = ({
  isAvailable,
  rusheeAvailabilities,
  userAvailabilities,
  slot,
  rusheeId,
  interviewDay,
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
      <SchedulePopover
        rusheeAvailabilities={rusheeAvailabilities}
        userAvailabilities={userAvailabilities}
        isAvailable={isAvailable}
        slot={slot}
        rusheeId={rusheeId}
        interviewDay={interviewDay}
      />
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
