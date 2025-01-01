"use client";
import { format } from "date-fns";
import { InterviewDay } from "@/types/admin/types";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function DateCard({ date }: { date: InterviewDay }) {
  return (
    <div
      key={date.id}
      className="p-4 bg-white rounded-lg shadow-md flex items-center justify-between"
    >
      <p>{format(new Date(date.interview_date), "PPP")}</p>
      <Button variant="destructive">
        <Trash2 />
      </Button>
    </div>
  );
}
