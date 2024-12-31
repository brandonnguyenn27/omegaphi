"use client";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { RusheeAvailability } from "@/types/admin/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  deleteRusheeAvailability,
  updateRusheeAvailability,
} from "@/actions/admin/rushee";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface RusheeAvailabilityCardProps {
  availability: RusheeAvailability;
}
const RusheeAvailabilityCard = ({
  availability,
}: RusheeAvailabilityCardProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    date: format(new Date(availability.start_time), "yyyy-MM-dd"),
    start_time: format(new Date(availability.start_time), "HH:mm"),
    end_time: format(new Date(availability.end_time), "HH:mm"),
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newStartTime = new Date(`${formState.date}T${formState.start_time}`);
    const newEndTime = new Date(`${formState.date}T${formState.end_time}`);

    await updateRusheeAvailability({
      id: availability.id,
      rushee_id: availability.rushee_id,
      start_time: newStartTime.toISOString(),
      end_time: newEndTime.toISOString(),
    });

    setOpen(false);
    router.refresh();
  };
  return (
    <Card key={availability.id} className="shadow-lg">
      <CardHeader>
        <h3 className="text-lg font-semibold">
          Availability on {format(new Date(availability.start_time), "PPP")}
        </h3>
      </CardHeader>
      <div className="p-4">
        <p>
          <span className="font-medium">Start Time:</span>{" "}
          {format(new Date(availability.start_time), "p")}
        </p>
        <p>
          <span className="font-medium">End Time:</span>{" "}
          {format(new Date(availability.end_time), "p")}
        </p>
      </div>
      <CardFooter className="flex justify-between items-center">
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="mr-2">
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Availability</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    value={formState.date}
                    onChange={(e) =>
                      setFormState({ ...formState, date: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Start Time
                  </label>
                  <Input
                    type="time"
                    value={formState.start_time}
                    onChange={(e) =>
                      setFormState({ ...formState, start_time: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">End Time</label>
                  <Input
                    type="time"
                    value={formState.end_time}
                    onChange={(e) =>
                      setFormState({ ...formState, end_time: e.target.value })
                    }
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Button
            variant="destructive"
            onClick={() => deleteRusheeAvailability(availability.id)}
          >
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RusheeAvailabilityCard;
