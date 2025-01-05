"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserAvailabilityFormProps {
  submitAction: (formData: FormData) => Promise<void>;
  userId: string;
}

export default function UserAvailabilityForm({
  submitAction,
  userId,
}: UserAvailabilityFormProps) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("date", date);
    formData.append("user_id", userId);
    formData.append("start_time", startTime);
    formData.append("end_time", endTime);

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
        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
