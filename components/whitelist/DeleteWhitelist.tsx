"use client";
import { Button } from "../ui/button";
import { deleteWhitelist } from "@/actions/admin/whitelist";

interface DeleteWhitelistProps {
  id: string;
}

export default function DeleteWhitelist({ id }: DeleteWhitelistProps) {
  return (
    <div>
      <Button
        variant="destructive"
        className="text-white"
        onClick={() => deleteWhitelist(id)}
      >
        Remove
      </Button>
    </div>
  );
}
