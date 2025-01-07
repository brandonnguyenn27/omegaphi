"use client";

import React, { useState } from "react";

import { addRusheeAvailability } from "@/actions/admin/rushee";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddAvailabilityModalProps {
  rusheeId: string;
}

export default function AddAvailabilityModal({
  rusheeId,
}: AddAvailabilityModalProps) {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    const date = formData.get("date") as string;
    const startTime = formData.get("start_time") as string;
    const endTime = formData.get("end_time") as string;

    const startDateTime = new Date(`${date}T${startTime}:00Z`);
    const endDateTime = new Date(`${date}T${endTime}:00Z`);

    console.log(startDateTime, endDateTime);

    if (startDateTime >= endDateTime) {
      setAlertOpen(true);
      return;
    }
    formData.set("start_time", startDateTime.toISOString());
    formData.set("end_time", endDateTime.toISOString());
    formData.append("rushee_id", rusheeId);

    try {
      await addRusheeAvailability(formData);

      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mr-2">
            Add Availability
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Availability</DialogTitle>
            <DialogDescription>
              Fill out the fields below to add a new availability record.
            </DialogDescription>
          </DialogHeader>
          <form action={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Date</label>
              <Input type="date" name="date" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Start Time</label>
              <Input type="time" name="start_time" required />
            </div>
            <div>
              <label className="block text-sm font-medium">End Time</label>
              <Input type="time" name="end_time" required />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-500 text-white">
                Add Availability
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Invalid Time</AlertDialogTitle>
            <AlertDialogDescription>
              The start time must be before the end time. Please correct the
              times and try again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setAlertOpen(false)}>OK</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
