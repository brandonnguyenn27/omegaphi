"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/utils/helper";

interface UserAvailabilityFormProps {
  submitAction: (formData: FormData) => Promise<void>;
  interview_dates: string[];
}

export default function UserAvailabilityForm({
  submitAction,
  interview_dates,
}: UserAvailabilityFormProps) {
  const defaultStart = "09:00";
  const defaultEnd = "20:00";
  return (
    <form action={submitAction} className="space-y-4">
      <div>
        <label className="block font-medium mb-1">
          Date <span className="text-red-500">*</span>
        </label>
        <Select name="date" required>
          <SelectTrigger>
            <SelectValue placeholder="Select a date" />
          </SelectTrigger>
          <SelectContent>
            {interview_dates.map((date) => (
              <SelectItem key={date} value={date}>
                {formatDate(date)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block mb-2">
          Start Time<span className="text-red-500">*</span>
        </label>
        <Input
          type="time"
          name="start_time"
          className="w-full p-2 border rounded"
          defaultValue={defaultStart}
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
          defaultValue={defaultEnd}
          required
        />
        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
