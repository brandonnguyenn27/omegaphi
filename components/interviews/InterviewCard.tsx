//TODO: start and end time are incorrect. Needs fixing. Seems to be not in UTC time format.
import { Interview } from "@/types/ui/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { formatDateTime } from "@/utils/helper";

type InterviewCardProps = {
  interviews: Interview[];
};

export default function InterviewCard({ interviews }: InterviewCardProps) {
  if (interviews.length === 0) {
    return (
      <Card>
        <CardContent className="flex text-center justify-center center">
          <p className="pt-4">
            You have no interviews scheduled for this day yet.
          </p>
        </CardContent>
      </Card>
    );
  }
  return (
    <div>
      {interviews.map((interview) => (
        <Card key={interview.id} className="mb-4">
          <CardHeader>
            <CardTitle>{interview.interviewee_name}</CardTitle>
            <CardDescription>
              Partner: {interview.partner_name || "N/A"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Start Time: {formatDateTime(interview.start_time)}</p>
            <p>End Time: {formatDateTime(interview.end_time)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
