import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { addInterviewDateAction } from "@/actions/admin/interviews";

export default async function AddInterviewDateModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button className="bg-blue-500 text-white" variant="default">
            Add Interview Date
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Interview Date</DialogTitle>
        </DialogHeader>
        <form action={addInterviewDateAction} className="space-y-4">
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
