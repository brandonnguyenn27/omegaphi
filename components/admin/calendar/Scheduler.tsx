"use client";

import React, { useMemo } from "react";
import { format, addMinutes, parseISO } from "date-fns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { InterviewDay, AvailabilityExtended } from "@/types/admin/types";
import { Rushee } from "@/types/admin/types";
import { formatDate } from "@/utils/helper";

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
  console.log("availabilities: ", availabilities);
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
  console.log(distinctDates);

  const timeSlots = generateTimeSlots(8, 20);

  return (
    <Tabs defaultValue={distinctDates[0]}>
      <TabsList>
        {distinctDates.map((date) => (
          <TabsTrigger key={date} value={date}>
            {formatDate(date)}
          </TabsTrigger>
        ))}
      </TabsList>

      {distinctDates.map((date) => {
        const availabilitiesForDay = availabilities.filter(
          (a) => format(parseISO(a.start_time), "yyyy-MM-dd") === date
        );
        const distinctRushees: Rushee[] = Array.from(
          new Map(
            availabilitiesForDay.map((a) => [
              a.rushee_id,
              { id: a.rushee_id, ...a.rushees },
            ])
          ).values()
        );

        return (
          <TabsContent key={date} value={date}>
            <div className="overflow-auto">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `200px repeat(${timeSlots.length}, minmax(50px, 1fr))`,
                }}
                className="border border-gray-300"
              >
                {/* Header Row */}
                <div className="sticky top-0 bg-gray-100 border-b border-r border-gray-300" />
                {timeSlots.map((slot) => (
                  <div
                    key={slot}
                    className="sticky top-0 bg-gray-100 border-b border-r border-gray-300 text-center text-xs p-1"
                  >
                    {formatTimeSlotWithDateFns(slot)}
                  </div>
                ))}

                {/* Rushee Rows */}
                {distinctRushees.map((rushee: Rushee) => (
                  <React.Fragment key={rushee.id}>
                    <div className="sticky left-0 bg-gray-100 border-r border-b border-gray-300 p-1 text-sm">
                      {rushee.first_name} {rushee.last_name}
                    </div>
                    {timeSlots.map((slot) => {
                      const [hour, minute] = slot.split(":").map(Number);
                      const slotStart = parseISO(`${date}T${slot}:00Z`);
                      const slotEnd = addMinutes(slotStart, 30); // Add 30 minutes to get slot end

                      // Filter availabilities for this rushee and time slot
                      const rusheeAvailabilities = availabilitiesForDay.filter(
                        (a) => {
                          if (a.rushee_id !== rushee.id) return false;

                          const availStart = new Date(a.start_time);
                          const availEnd = new Date(a.end_time);

                          // Check if availability overlaps with the time slot
                          return availStart < slotEnd && availEnd > slotStart;
                        }
                      );

                      const isAvailable = rusheeAvailabilities.length > 0;
                      console.log(
                        "Rushee",
                        rushee.first_name,
                        "is available for slot",
                        slot,
                        ":",
                        isAvailable
                      );
                      return (
                        <div
                          key={`${rushee.id}-${slot}`}
                          className={`border-b border-r border-gray-300 h-10 ${
                            isAvailable ? `bg-red-500` : ""
                          }`}
                          title={
                            isAvailable
                              ? rusheeAvailabilities
                                  .map(
                                    (a) =>
                                      `Available: ${format(
                                        new Date(a.start_time),
                                        "p"
                                      )} - ${format(new Date(a.end_time), "p")}`
                                  )
                                  .join("\n")
                              : ""
                          }
                        />
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
