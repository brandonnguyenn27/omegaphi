import React from "react";
import { createClient } from "@/utils/supabase/server";
import { parseISO, addMinutes, format } from "date-fns";
import { InterviewDay, UserAvailabilityExtended } from "@/types/admin/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { padTime } from "@/utils/helper";

// i should abstract this into a helper function
function generateTimeSlots(startHour: number, endHour: number) {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${hour}:00`);
    slots.push(`${hour}:30`);
  }
  return slots;
}

function formatTimeSlot(timeSlot: string) {
  const [hourStr, minuteStr] = timeSlot.split(":");
  const date = new Date(2025, 0, 1, Number(hourStr), Number(minuteStr));
  return format(date, "h:mm a");
}

interface UserAvailabilityProps {
  interviewDays: InterviewDay[];
  userAvailabilities: UserAvailabilityExtended[];
}

export default async function UserAvailability({
  interviewDays,
  userAvailabilities,
}: UserAvailabilityProps) {
  const supabase = await createClient();
  const distinctDates = interviewDays.map((day) => day.interview_date).sort();

  const timeSlots = generateTimeSlots(9, 21);

  const userIds = Array.from(
    new Set(userAvailabilities.map((ua) => ua.user_id))
  );

  // Fetch profiles for these users
  const { data: profilesData, error } = await supabase
    .from("profiles")
    .select("*")
    .in("id", userIds);
  if (error) {
    console.error(error);
  }
  // Assume profilesData is an array of objects with first_name and last_name
  const profiles = (profilesData || []).sort((a: any, b: any) => {
    const nameA = (a.first_name || "").toLowerCase();
    const nameB = (b.first_name || "").toLowerCase();
    if (nameA === nameB) {
      return (a.last_name || "")
        .toLowerCase()
        .localeCompare((b.last_name || "").toLowerCase());
    }
    return nameA.localeCompare(nameB);
  });

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">User Availabilities</h1>
      <Tabs defaultValue={distinctDates[0]}>
        <TabsList className="mb-4 space-x-2">
          {distinctDates.map((date) => (
            <TabsTrigger
              key={date}
              value={date}
              className="rounded-md shadow-sm hover:bg-gray-200"
            >
              {format(parseISO(date), "MMM d, yyyy")}
            </TabsTrigger>
          ))}
        </TabsList>

        {distinctDates.map((date) => {
          const interviewDay = interviewDays.find(
            (day) => day.interview_date === date
          );
          const availabilitiesForDay = userAvailabilities.filter(
            (ua) => ua.interview_day_id === interviewDay?.id
          );

          return (
            <TabsContent
              key={date}
              value={date}
              className="rounded-md border border-gray-300 p-2 shadow-md"
            >
              <div className="overflow-auto">
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: `220px repeat(${timeSlots.length}, minmax(70px, 1fr))`,
                  }}
                >
                  <div
                    className="sticky top-0 left-0 bg-gray-100 border-b border-r border-gray-300 z-30"
                    style={{ height: "40px" }}
                  ></div>
                  {timeSlots.map((slot) => (
                    <div
                      key={slot}
                      className="sticky top-0 bg-gray-100 border-b border-gray-300 text-center text-xs p-2 z-10"
                    >
                      {formatTimeSlot(slot)}
                    </div>
                  ))}

                  {profiles.map((profile: any) => {
                    const userAvailabilitiesForDay =
                      availabilitiesForDay.filter(
                        (ua) => ua.user_id === profile.id
                      );
                    return (
                      <React.Fragment key={profile.id}>
                        <div className="sticky left-0 bg-white border-r border-b border-gray-300 p-2 text-sm font-medium rounded-l-md z-20">
                          {profile.first_name} {profile.last_name}
                        </div>

                        {timeSlots.map((slot) => {
                          const paddedSlot = padTime(slot);
                          const slotStart = new Date(
                            `${date}T${paddedSlot}:00Z`
                          );
                          const slotEnd = addMinutes(slotStart, 30);
                          const profileAvailabilities =
                            userAvailabilitiesForDay.filter((ua) => {
                              if (ua.user_id !== profile.id) return false;
                              const availStart = new Date(ua.start_time);
                              const availEnd = new Date(ua.end_time);
                              return (
                                availStart.getTime() <= slotStart.getTime() &&
                                availEnd.getTime() >= slotEnd.getTime()
                              );
                            });
                          const isAvailable = profileAvailabilities.length > 0;

                          const bgColor = isAvailable
                            ? "bg-green-500"
                            : "bg-gray-200";

                          return (
                            <div
                              key={`${profile.id}-${slot}`}
                              className={`border-r border-b border-gray-300 h-12 flex items-center justify-center text-xs ${bgColor}`}
                            />
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
