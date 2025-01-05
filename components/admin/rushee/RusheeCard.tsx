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

  const [firstName, setFirstName] = useState(rushee.first_name);
  const [lastName, setLastName] = useState(rushee.last_name);
  const [email, setEmail] = useState(rushee.email ?? "");
  const [phone, setPhone] = useState(rushee.phone ?? "");

  const [open, setOpen] = useState(false);

  async function handleDelete() {
    await deleteRusheeAction(rushee.id);
    router.refresh();
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await updateRusheeAction({
      id: rushee.id,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
    });
    setOpen(false);
    router.refresh();
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

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">
                  First Name<span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Last Name<span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <Input
                  type="email"
                  className="w-full border p-2 rounded"
                  value={email}
                  placeholder="Optional"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Phone</label>
                <Input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={phone}
                  placeholder="Optional"
                  onChange={(e) => setPhone(e.target.value)}
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
