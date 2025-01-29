"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";

import { addWhitelist } from "@/actions/admin/whitelist";

export default function AddWhitelist() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mr-2 bg-blue-500 text-white">
            Add Email
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Email to Whitelist</DialogTitle>
            <DialogDescription>
              Fill out the fields below to add a new email to the whitelist.
            </DialogDescription>
          </DialogHeader>
          <form action={addWhitelist} className="space-y-4">
            <div>
              <label className="block mb-2">
                Email<span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                name="email"
                className="w-full p-2 border rounded"
                required
              />
              <Button
                type="submit"
                className="mt-4"
                onClick={() => setOpen(false)}
              >
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
