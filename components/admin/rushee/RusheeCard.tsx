"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { SquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateRusheeAction, deleteRusheeAction } from "@/actions/admin/rushee";

interface Rushee {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
}

interface RusheeCardProps {
  rushee: Rushee;
}

export default function RusheeCard({ rushee }: RusheeCardProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  async function handleDelete() {
    await deleteRusheeAction(rushee.id);
    router.refresh();
  }

  async function handleUpdate(formData: FormData) {
    await updateRusheeAction(rushee.id, formData);
    setOpen(false);
  }

  return (
    <div className="rounded border h-auto p-4 space-y-2 bg-white shadow flex flex-col justify-between">
      <p className="font-semibold">
        {rushee.first_name} {rushee.last_name}
      </p>
      {rushee.email && <p>Email: {rushee.email}</p>}
      {rushee.phone && <p>Phone: {rushee.phone}</p>}

      <div className="flex space-x-2 mt-4">
        <Button asChild>
          <Link
            href={{
              pathname: "/admin/rushees/view",
              query: { rusheeId: rushee.id },
            }}
          >
            <SquareArrowOutUpRight />
          </Link>
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Edit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Rushee</DialogTitle>
              <DialogDescription>
                Make changes to the rushee information here.
              </DialogDescription>
            </DialogHeader>

            <form action={handleUpdate} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">
                  First Name<span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="first_name"
                  className="w-full border p-2 rounded"
                  defaultValue={rushee.first_name}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Last Name<span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="last_name"
                  className="w-full border p-2 rounded"
                  defaultValue={rushee.last_name}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <Input
                  type="email"
                  name="email"
                  className="w-full border p-2 rounded"
                  defaultValue={rushee.email || ""}
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Phone</label>
                <Input
                  type="text"
                  name="phone"
                  className="w-full border p-2 rounded"
                  defaultValue={rushee.phone || ""}
                  placeholder="Optional"
                />
              </div>
              <DialogFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
