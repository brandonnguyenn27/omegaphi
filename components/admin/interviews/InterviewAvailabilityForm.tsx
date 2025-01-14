"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserAvailabilityFormProps {
  submitAction: (formData: FormData) => Promise<void>;
}

export default function UserAvailabilityForm({
  submitAction,
}: UserAvailabilityFormProps) {
  return (
    <form action={submitAction} className="space-y-4">
      <div>
        <label className="block font-medium mb-1">
          Date <span className="text-red-500">*</span>
        </label>
        <Input type="date" name="date" required />
      </div>
      <div>
        <label className="block mb-2">
          Start Time<span className="text-red-500">*</span>
        </label>
        <Input
          type="time"
          name="start_time"
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-2">
          End Time<span className="text-red-500">*</span>
        </label>
        <Input
          type="time"
          name="end_time"
          className="w-full p-2 border rounded"
          required
        />
        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
