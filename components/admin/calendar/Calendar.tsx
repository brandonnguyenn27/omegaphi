"use client";

import React, { useMemo } from "react";
import { InterviewDay } from "@/types/admin/types";
import { format } from "date-fns";

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
}

export default function Scheduler({ interviews }: SchedulerProps) {
  const distinctDates = useMemo(() => {
    const dates = interviews.map((day) => day.interview_date);
    const uniqueDates = Array.from(new Set(dates));
    return uniqueDates;
  }, [interviews]);
  const timeSlots = generateTimeSlots(8, 20);
  console.log(timeSlots);
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
        <div className="border-b border-gray-300 bg-gray-100 p-2" />
        {distinctDates.map((dateStr) => (
          <div
            key={dateStr}
            className="border-l border-b border-gray-300 bg-gray-100 p-2 text-center font-semibold"
          >
            {format(new Date(dateStr), "PPP")}
          </div>
        ))}

        {timeSlots.map((timeLabel) => (
          <React.Fragment key={timeLabel}>
            <div className="border-b border-gray-300 p-2 text-center text-sm text-gray-600">
              {formatTimeSlotWithDateFns(timeLabel)}
            </div>

            {distinctDates.map((dateStr) => {
              const interviewsForDate = interviews.filter(
                (i) => i.interview_date === dateStr
              );

              return (
                <div
                  key={`${dateStr}-${timeLabel}`}
                  className="border-l border-b border-gray-300 p-2 hover:bg-blue-50"
                >
                  {interviewsForDate
                    .filter((i) => i.start_time.startsWith(timeLabel))
                    .map((matchedInterview) => (
                      <div
                        key={matchedInterview.id}
                        className="bg-blue-100 p-1 rounded my-1"
                      >
                        <p className="text-xs font-bold">
                          {matchedInterview.title}
                        </p>
                        {matchedInterview.description && (
                          <p className="text-[0.7rem] text-gray-700">
                            {matchedInterview.description}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
