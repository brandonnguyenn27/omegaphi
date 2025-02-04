"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  UserAvailabilityScheduler,
  RusheeAvailabilityScheduler,
} from "@/types/admin/types";
import { Button } from "@/components/ui/button";

import { useRef } from "react";
import { SubmitInterview } from "@/actions/admin/scheduler";

interface SchedulePopoverProps {
  rusheeAvailabilities: RusheeAvailabilityScheduler[];
  userAvailabilities: UserAvailabilityScheduler[];
  isAvailable: boolean;
  slot: string;
  rusheeId: string;
}

export default function SchedulePopover(props: SchedulePopoverProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedUsers.length !== 2) {
      event.preventDefault();
      setError("Please select exactly 2 users.");
    } else {
      setError("");
      // Note: When validation passes, the form's action will trigger the server action.
    }
  };

  const formRef = useRef<HTMLFormElement>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [error, setError] = useState("");
  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (checked) {
      if (selectedUsers.length < 2) {
        setSelectedUsers((prev) => [...prev, id]);
      }
    } else {
      setSelectedUsers((prev) => prev.filter((uid) => uid !== id));
    }
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <div
            key={`${props.rusheeId}-${props.slot}`}
            className="border-b border-r border-gray-300 h-12 flex items-center justify-center text-xs transition-colors duration-200 bg-red-500 text-white hover:bg-red-600 cursor-pointer"
          ></div>
        </PopoverTrigger>
        <PopoverContent>
          <h3 className="font-semibold text-lg mb-2">Time Slot Details</h3>
          {props.userAvailabilities.length > 0 ? (
            <>
              <p className="mb-4">Brothers available in this timeslot:</p>
              <form action={SubmitInterview} method="post" ref={formRef}>
                {/* Hidden inputs to pass along additional metadata */}
                <input type="hidden" name="slot" value={props.slot} />
                <input type="hidden" name="rusheeId" value={props.rusheeId} />
                <input
                  type="hidden"
                  name="selectedUsers"
                  value={JSON.stringify(selectedUsers)}
                />

                <div>
                  {props.userAvailabilities.map((ua) => {
                    const isChecked = selectedUsers.includes(ua.id);
                    // Disable unchecked checkboxes when two are already selected.
                    const isDisabled = !isChecked && selectedUsers.length >= 2;
                    return (
                      <div
                        key={ua.id}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Checkbox
                          id={`user-${ua.id}`}
                          checked={isChecked}
                          disabled={isDisabled}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              ua.id,
                              typeof checked === "boolean" ? checked : false
                            )
                          }
                        />
                        <label
                          htmlFor={`user-${ua.id}`}
                          className={isDisabled ? "text-gray-400" : ""}
                        >
                          {ua.profiles.first_name} {ua.profiles.last_name}
                        </label>
                      </div>
                    );
                  })}
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button
                  type="submit"
                  onClick={handleClick}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Submit
                </Button>
              </form>
            </>
          ) : (
            <p>No brothers available in this timeslot.</p>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
