import React from "react";
import { format, addMinutes, parseISO } from "date-fns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  InterviewDay,
  AvailabilityExtended,
  UserAvailabilityExtended,
  Rushee,
} from "@/types/admin/types";
import { formatDate } from "@/utils/helper";
import TimeSlotCell from "./TimeSlotCell";
import { padTime } from "@/utils/helper";
import { createClient } from "@/utils/supabase/server";

function generateTimeSlots(startHour: number, endHour: number) {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${hour}:00`);
    slots.push(`${hour}:30`);
  }
  return slots;
}

function formatTimeSlotWithDateFns(timeSlot: string) {
  const [hour, minute] = timeSlot.split(":");
  const tempDate = new Date(2025, 0, 1, +hour, +minute);
  return format(tempDate, "h:mm a");
}

interface SchedulerProps {
  interviews: InterviewDay[];
  availabilities: AvailabilityExtended[];
  userAvailabilities: UserAvailabilityExtended[];
}

export default async function Scheduler({
  interviews,
  availabilities,
  userAvailabilities,
}: SchedulerProps) {
  const supabase = await createClient();
  const distinctDates = interviews.map((day) => day.interview_date).sort();

  const timeSlots = generateTimeSlots(9, 21);

  const fetchRushees = async (date: string) => {
    const availabilitiesForDay = (availabilities || []).filter(
      (a) => format(parseISO(a.start_time), "yyyy-MM-dd") === date
    );

    const rusheeIds = Array.from(
      new Set(availabilitiesForDay.map((a) => a.rushee_id))
    );

    const { data: rushees, error } = await supabase
      .from("rushees")
      .select("*")
      .in("id", rusheeIds);

    if (error) {
      console.error("Error fetching rushees:", error);
      return [];
    }

    return rushees;
  };

  const rusheesByDate = await Promise.all(
    distinctDates.map(async (date) => {
      const rushees = await fetchRushees(date);
      return { date, rushees };
    })
  );

  return (
    <div className="p-4">
      <Tabs defaultValue={distinctDates[0]}>
        <TabsList className="mb-4 space-x-2">
          {distinctDates.map((date) => {
            return (
              <TabsTrigger
                key={date}
                value={date}
                className="rounded-md shadow-sm hover:bg-gray-200"
              >
                {formatDate(date)}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {rusheesByDate.map(({ date, rushees }) => {
          const availabilitiesForDay = (availabilities || []).filter(
            (a) => format(parseISO(a.start_time), "yyyy-MM-dd") === date
          );

          const userAvailabilitiesForDay = (userAvailabilities || []).filter(
            (ua) => format(parseISO(ua.start_time), "yyyy-MM-dd") === date
          );

          return (
            <TabsContent
              key={date}
              value={date}
              className="rounded-md border border-gray-300 p-2 shadow-md"
            >
              <div className="overflow-auto">
                <div
                  className="grid auto-cols-fr"
                  style={{
                    gridTemplateColumns: `220px repeat(${timeSlots.length}, minmax(70px, 1fr))`,
                  }}
                >
                  <div
                    className="sticky top-0 left-0 bg-gray-100 border-b border-r border-gray-300 z-30"
                    style={{
                      height: "40px",
                    }}
                  ></div>
                  {timeSlots.map((slot) => (
                    <div
                      key={slot}
                      className="sticky top-0 bg-gray-100 border-b border-gray-300 text-center text-xs p-2 z-10"
                    >
                      {formatTimeSlotWithDateFns(slot)}
                    </div>
                  ))}

                  {rushees.map((rushee: Rushee) => (
                    <React.Fragment key={rushee.id}>
                      <div
                        className={`sticky left-0 bg-white border-r border-b border-gray-300 p-2 text-sm font-medium rounded-l-md z-20 ${
                          rushee.is_scheduled ? "text-green-500" : ""
                        }`}
                      >
                        {rushee.first_name} {rushee.last_name}
                      </div>
                      {timeSlots.map((slot) => {
                        const paddedSlot = padTime(slot);
                        const slotStart = parseISO(`${date}T${paddedSlot}:00Z`);

                        const slotEnd = addMinutes(slotStart, 30);

                        const rusheeAvailabilities =
                          availabilitiesForDay.filter((a) => {
                            if (a.rushee_id !== rushee.id) return false;

                            const availStart = new Date(a.start_time);
                            const availEnd = new Date(a.end_time);

                            return availStart < slotEnd && availEnd > slotStart;
                          });

                        const isAvailable = rusheeAvailabilities.length > 0;
                        const userAvailabilitiesForSlot =
                          userAvailabilitiesForDay.filter((ua) => {
                            const userStart = new Date(ua.start_time);
                            const userEnd = new Date(ua.end_time);
                            return userStart < slotEnd && userEnd > slotStart;
                          });
                        return (
                          <TimeSlotCell
                            key={`${rushee.id}-${slot}`}
                            isAvailable={isAvailable}
                            rusheeAvailabilities={rusheeAvailabilities}
                            userAvailabilities={userAvailabilitiesForSlot}
                            slot={slotStart}
                            interviewDay={
                              interviews.find(
                                (interview) => interview.interview_date === date
                              ) as InterviewDay
                            }
                            rusheeId={rushee.id}
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
    </div>
  );
}
