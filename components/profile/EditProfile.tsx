"use client";

import React, { useState } from "react";
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
import { updateProfileAction } from "@/actions/profile";
import { Input } from "@/components/ui/input";

interface EditProfileModalProps {
  userId: string;
  currentFirstName?: string;
  currentLastName?: string;
}

export default function EditProfileModal({
  userId,
  currentFirstName,
  currentLastName,
}: EditProfileModalProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    formData.append("user_id", userId);

    try {
      await updateProfileAction(formData);
      setOpen(false);
      setError("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err?.message || "Error updating profile.");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your first and last name.
          </DialogDescription>
        </DialogHeader>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 p-2"
              htmlFor="first_name"
            >
              First Name
            </label>
            <Input
              defaultValue={currentFirstName}
              type="text"
              name="first_name"
              id="first_name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 p-2"
              htmlFor="last_name"
            >
              Last Name
            </label>
            <Input
              defaultValue={currentLastName}
              type="text"
              name="last_name"
              id="last_name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
