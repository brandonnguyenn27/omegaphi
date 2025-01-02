"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { addInterviewDateAction } from "@/actions/admin/interviews";

export default function AddInterviewDateModal() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await addInterviewDateAction(formData);
      router.refresh();
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white" variant="default">
          Add Interview Date
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Interview Date</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div>
            <label className="block font-medium mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="title"
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Interview Date <span className="text-red-500">*</span>
            </label>
            <Input
              type="date"
              name="interview_date"
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Start Time <span className="text-red-500">*</span>
            </label>
            <Input
              type="time"
              name="start_time"
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              End Time <span className="text-red-500">*</span>
            </label>
            <Input
              type="time"
              name="end_time"
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <Button type="submit" className="bg-blue-500 text-white">
            Add Interview Date
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
