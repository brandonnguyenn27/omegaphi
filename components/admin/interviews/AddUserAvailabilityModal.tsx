"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
}

export default function AddUserAvailabilityModal({
  userId,
}: AddUserAvailabilityModalProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const startTime = formData.get("start_time") as string;
    const endTime = formData.get("end_time") as string;

    if (startTime >= endTime) {
      setError("Start time must be less than end time.");
      return;
    }

    formData.append("user_id", userId);

    try {
      await addUserAvailabilityAction(formData);
      setOpen(false);
      router.refresh();
    } catch {
      setError("An error occurred while adding availability.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Add Availability</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Availability</DialogTitle>
          <DialogDescription>
            Add your availability for interviews.
          </DialogDescription>
        </DialogHeader>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <UserAvailabilityForm submitAction={handleSubmit} userId={userId} />
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
