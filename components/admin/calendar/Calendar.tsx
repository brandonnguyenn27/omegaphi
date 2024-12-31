"use client";

import React, { useMemo } from "react";
import { InterviewDay, AvailabilityExtended } from "@/types/admin/types";
import { format, isWithinInterval, parseISO } from "date-fns";

function generateTimeSlots(startHour = 8, endHour = 20) {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${hour}:00`);
    slots.push(`${hour}:30`);
  }
  return slots;
}

function formatTimeSlotWithDateFns(timeSlot: string) {
  const [hour, minute] = timeSlot.split(":");

  const tempDate = new Date(2024, 0, 1, +hour, +minute);

  return format(tempDate, "h:mm a");
}

interface SchedulerProps {
  interviews: InterviewDay[];
  availabilities: AvailabilityExtended[];
}

export default function Scheduler({
  interviews,
  availabilities,
}: SchedulerProps) {
  const distinctDates = useMemo(() => {
    const dates = [
      ...new Set([
        ...interviews.map((day) => day.interview_date),
        ...availabilities.map((a) =>
          format(parseISO(a.start_time), "yyyy-MM-dd")
        ),
      ]),
    ];
    return dates.sort();
  }, [interviews, availabilities]);
  const timeSlots = generateTimeSlots(8, 20);

  const columns = 1 + distinctDates.length;

  return (
    <div className="bg-gray-50 p-2 rounded shadow">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
        className="gap-0 border border-gray-300 bg-white"
      >
        {/* Header Row */}
        <div className="border-b border-gray-300 bg-gray-100 p-2" />
        {distinctDates.map((dateStr) => (
          <div
            key={dateStr}
            className="border-l border-b border-gray-300 bg-gray-100 p-2 text-center font-semibold"
          >
            {format(new Date(dateStr), "PPP")}
          </div>
        ))}

        {/* Time Slots and Availabilities */}
        {timeSlots.map((timeLabel) => (
          <React.Fragment key={timeLabel}>
            {/* Time Column */}
            <div className="border-b border-gray-300 p-2 text-center text-sm text-gray-600">
              {formatTimeSlotWithDateFns(timeLabel)}
            </div>

            {/* Date Columns */}
            {distinctDates.map((dateStr) => {
              const availabilitiesForDate = availabilities.filter((a) =>
                isWithinInterval(parseISO(`${dateStr}T${timeLabel}`), {
                  start: parseISO(a.start_time),
                  end: parseISO(a.end_time),
                })
              );

              return (
                <div
                  key={`${dateStr}-${timeLabel}`}
                  className="border-l border-b border-gray-300 p-2 relative hover:bg-blue-50"
                >
                  {/* Flexbox to stack availability cards */}
                  <div className="flex flex-col gap-1">
                    {availabilitiesForDate.map((availability) => (
                      <div
                        key={availability.id}
                        className="bg-green-100 rounded p-2 shadow-md border"
                        title={`Available from ${format(
                          parseISO(availability.start_time),
                          "p"
                        )} to ${format(parseISO(availability.end_time), "p")}`}
                      >
                        <p className="text-sm font-semibold">
                          {availability.rushees.first_name}{" "}
                          {availability.rushees.last_name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
