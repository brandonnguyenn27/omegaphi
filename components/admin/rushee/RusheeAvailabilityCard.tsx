import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { RusheeAvailability } from "@/types/admin/types";

interface RusheeAvailabilityCardProps {
  availability: RusheeAvailability;
}
const RusheeAvailabilityCard = ({
  availability,
}: RusheeAvailabilityCardProps) => {
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
          <Button variant="outline" className="mr-2">
            Edit
          </Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RusheeAvailabilityCard;
