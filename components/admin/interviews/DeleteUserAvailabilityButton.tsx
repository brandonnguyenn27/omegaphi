"use client";
import { Button } from "@/components/ui/button";
import { deleteUserAvailabilityAction } from "@/actions/admin/interviews";

interface DeleteUserAvailabilityButtonProps {
  availability_id: string;
}

export default function DeleteUserAvailabilityButton({
  availability_id,
}: DeleteUserAvailabilityButtonProps) {
  return (
    <Button
      onClick={() => deleteUserAvailabilityAction(availability_id)}
      variant="destructive"
    >
      Delete
    </Button>
  );
}
