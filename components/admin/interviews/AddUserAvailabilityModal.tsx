"use client";

import React, { useState } from "react";
import { addUserAvailabilityAction } from "@/actions/admin/interviews";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UserAvailabilityForm from "./InterviewAvailabilityForm";

interface AddUserAvailabilityModalProps {
  userId: string;
  interview_dates: string[];
}

export default function AddUserAvailabilityModal({
  userId,
  interview_dates,
}: AddUserAvailabilityModalProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    const startTime = formData.get("start_time") as string;
    const endTime = formData.get("end_time") as string;
    const date = formData.get("date") as string;
    const startDateTime = new Date(`${date}T${startTime}:00Z`).toISOString();
    const endDateTime = new Date(`${date}T${endTime}:00Z`).toISOString();

    if (startTime >= endTime) {
      setError("Start time must be less than end time.");
      return;
    }

    formData.append("user_id", userId);
    formData.set("start_time", startDateTime);
    formData.set("end_time", endDateTime);

    try {
      await addUserAvailabilityAction(formData);
      setOpen(false);
      setError("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err?.message || "An unexpected error occurred.");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>
          <Button>Add Availability</Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Availability</DialogTitle>
          <DialogDescription>
            Add your availability for interviews.
          </DialogDescription>
        </DialogHeader>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <UserAvailabilityForm
          submitAction={handleSubmit}
          interview_dates={interview_dates}
        />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
