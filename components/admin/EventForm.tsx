"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/admin/types";
import { Input } from "@/components/ui/input";
import { format, parseISO } from "date-fns";

interface EventFormProps {
  event?: Event;
  submitAction: (formData: FormData) => Promise<void>;
}

export default function EventForm({ event, submitAction }: EventFormProps) {
  const [title, setTitle] = useState(event?.title ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [date, setDate] = useState(event?.date ?? "");
  const [startTime, setStartTime] = useState(event?.start_time ?? "");
  const [endTime, setEndTime] = useState(event?.end_time ?? "");
  const [location, setLocation] = useState(event?.location ?? "");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("start_time", startTime);
    formData.append("end_time", endTime);
    formData.append("location", location);

    await submitAction(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2">
          Title<span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
        />
      </div>

      <div>
        <label className="block mb-2">
          Date<span className="text-red-500">*</span>
        </label>
        <Input
          type="date"
          value={date ? format(parseISO(date), "yyyy-MM-dd") : ""}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Start Time</label>
          <Input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">End Time</label>
          <Input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-2">Location</label>
        <Input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <Button type="submit">{event ? "Update Event" : "Create Event"}</Button>
    </form>
  );
}
