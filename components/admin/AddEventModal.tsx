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
import { AddEventAction } from "@/actions/admin/event";
import { useRouter } from "next/navigation";

export default function AddEventModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleAdd = async (formData: FormData) => {
    await AddEventAction(formData);
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Event</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        <EventForm submitAction={handleAdd} />
      </DialogContent>
    </Dialog>
  );
}
