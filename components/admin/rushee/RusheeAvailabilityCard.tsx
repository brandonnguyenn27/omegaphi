"use client";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, toZonedTime } from "date-fns-tz";
import { RusheeAvailability } from "@/types/admin/types";
import { useState } from "react";

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
  rusheeName?: string;
}
const RusheeAvailabilityCard = ({
  availability,
  rusheeName,
}: RusheeAvailabilityCardProps) => {
  const timeZone = "UTC";
  const [open, setOpen] = useState(false);
  const date = format(new Date(availability.start_time), "yyyy-MM-dd");
  const start_time = format(
    toZonedTime(new Date(availability.start_time), timeZone),
    "HH:mm"
  );
  const end_time = format(
    toZonedTime(new Date(availability.end_time), timeZone),
    "HH:mm"
  );

  const handleSubmit = async (formData: FormData) => {
    const date = formData.get("date") as string;

    const newStartTime = new Date(`${date}T${formData.get("start_time")}:00Z`);
    const newEndTime = new Date(`${date}T${formData.get("end_time")}:00Z`);

    console.log(newStartTime, newEndTime);

    formData.set("start_time", newStartTime.toISOString());
    formData.set("end_time", newEndTime.toISOString());

    await updateRusheeAvailability(
      availability.id,
      availability.rushee_id,
      formData
    );

    setOpen(false);
  };

  return (
    <Card key={availability.id} className="shadow-lg w-1/2">
      <CardHeader>
        {rusheeName && (
          <h3 className="text-lg font-semibold mb-1">{rusheeName}</h3>
        )}
        <h3 className="text-lg font-semibold">
          {format(
            toZonedTime(new Date(availability.start_time), timeZone),
            "PPP"
          )}
        </h3>
      </CardHeader>
      <div className="p-4 ml-4">
        <p>
          <span className="font-medium">Start Time:</span>{" "}
          {format(
            toZonedTime(new Date(availability.start_time), timeZone),
            "p"
          )}
        </p>
        <p>
          <span className="font-medium">End Time:</span>{" "}
          {format(toZonedTime(new Date(availability.end_time), timeZone), "p")}
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
              <form action={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Date</label>
                  <Input type="date" name="date" defaultValue={date} required />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Start Time
                  </label>
                  <Input
                    type="time"
                    name="start_time"
                    defaultValue={start_time}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">End Time</label>
                  <Input type="time" name="end_time" defaultValue={end_time} />
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
