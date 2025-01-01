"use client";
import { format, parseISO } from "date-fns";
import { InterviewDay } from "@/types/admin/types";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteInterviewDateAction } from "@/actions/admin/interviews";

export default function DateCard({ date }: { date: InterviewDay }) {
  const router = useRouter();
  async function handleDelete(id: string) {
    await deleteInterviewDateAction(id);
    router.refresh();
  }

  return (
    <div
      key={date.id}
      className="p-4 bg-white rounded-lg shadow-md flex items-center justify-between"
    >
      <p>{format(parseISO(date.interview_date), "PPP")}</p>
      <Button variant="destructive" onClick={() => handleDelete(date.id)}>
        <Trash2 />
      </Button>
    </div>
  );
}
