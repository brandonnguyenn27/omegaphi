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
  interview_day_id: string;
}

export default function AddUserAvailabilityModal({
  userId,
  interview_day_id,
}: AddUserAvailabilityModalProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    formData.append("user_id", userId);
    formData.append("interview_day_id", interview_day_id);
    await addUserAvailabilityAction(formData);
    setOpen(false);
    router.refresh();
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
        <UserAvailabilityForm submitAction={handleSubmit} />
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
