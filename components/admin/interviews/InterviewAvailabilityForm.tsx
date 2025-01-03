"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserAvailability } from "@/types/admin/types";
import { Input } from "@/components/ui/input";

interface UserAvailabilityFormProps {
  availability?: UserAvailability;
  submitAction: (formData: FormData) => Promise<void>;
  interview_day_id: string;
}

export default function UserAvailabilityForm({
  availability,
  submitAction,
  interview_day_id,
}: UserAvailabilityFormProps) {
  const [startTime, setStartTime] = useState(availability?.start_time ?? "");
  const [endTime, setEndTime] = useState(availability?.end_time ?? "");
  const [date, setDate] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("date", date);
    formData.append("user_id", availability?.user_id ?? "");
    formData.append("start_time", startTime);
    formData.append("end_time", endTime);
    formData.append("interview_day_id", interview_day_id);

    await submitAction(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium mb-1">
          Date <span className="text-red-500">*</span>
        </label>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-2">
          Start Time<span className="text-red-500">*</span>
        </label>
        <Input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-2">
          End Time<span className="text-red-500">*</span>
        </label>
        <Input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
}
