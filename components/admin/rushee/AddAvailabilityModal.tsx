"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
  AlertDialogTrigger,
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
  const router = useRouter();
  const [formState, setFormState] = useState({
    date: "",
    start_time: "",
    end_time: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newStartTime = new Date(`${formState.date}T${formState.start_time}`);
    const newEndTime = new Date(`${formState.date}T${formState.end_time}`);

    if (newStartTime >= newEndTime) {
      setAlertOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("rushee_id", rusheeId);
    formData.append("start_time", newStartTime.toISOString());
    formData.append("end_time", newEndTime.toISOString());

    await addRusheeAvailability(formData);

    router.refresh();
    setOpen(false);
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Date</label>
              <Input
                type="date"
                value={formState.date}
                onChange={(e) =>
                  setFormState({ ...formState, date: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Start Time</label>
              <Input
                type="time"
                value={formState.start_time}
                onChange={(e) =>
                  setFormState({ ...formState, start_time: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">End Time</label>
              <Input
                type="time"
                value={formState.end_time}
                onChange={(e) =>
                  setFormState({ ...formState, end_time: e.target.value })
                }
                required
              />
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
