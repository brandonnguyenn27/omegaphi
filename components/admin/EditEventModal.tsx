"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EventForm from "./EventForm";
import { Event } from "@/types/admin/types";
import { UpdateEventAction } from "@/actions/admin/event";
import { useRouter } from "next/navigation";

interface EditEventModalProps {
  event: Event;
}

export default function EditEventModal({ event }: EditEventModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleUpdate = async (formData: FormData) => {
    await UpdateEventAction(event.id, formData);
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>
        <EventForm event={event} submitAction={handleUpdate} />
      </DialogContent>
    </Dialog>
  );
}
