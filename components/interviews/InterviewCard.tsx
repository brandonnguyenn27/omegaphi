import { Interview } from "@/types/ui/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type InterviewCardProps = {
  interviews: Interview[];
};

export default function InterviewCard({ interviews }: InterviewCardProps) {
  console.log("Rendering InterviewCard with interviews:", interviews);
  if (interviews.length === 0) {
    return (
      <Card>
        <CardContent>
          <p>You have no interviews scheduled yet.</p>
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
            <p>Start Time: {new Date(interview.start_time).toLocaleString()}</p>
            <p>End Time: {new Date(interview.end_time).toLocaleString()}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
