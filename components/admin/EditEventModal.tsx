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

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

interface EditEventModalProps {
  event: Event;
}

export default function EditEventModal({ event }: EditEventModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>
        <EventForm event={event} onComplete={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
