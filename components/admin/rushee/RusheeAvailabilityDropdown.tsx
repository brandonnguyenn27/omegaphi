"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function AvailabilitySortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current availabilitySort from URL, default to 'date-desc' or any default of your choice
  const currentAvailabilitySort =
    searchParams.get("availabilitySort") || "date-desc";

  const handleChange = (newSort: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (newSort && newSort !== "date-desc") {
      newSearchParams.set("availabilitySort", newSort);
    } else {
      // If newSort is default, remove the parameter
      newSearchParams.delete("availabilitySort");
    }

    // Construct the new URL with updated search params and push it
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <Select value={currentAvailabilitySort} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort Availabilities..." />
      </SelectTrigger>
      <SelectContent>
        {/* Adjust or add sort options as needed */}
        <SelectItem value="date-desc">Date: Newest First</SelectItem>
        <SelectItem value="date-asc">Date: Oldest First</SelectItem>
        <SelectItem value="name-asc">Name: A → Z</SelectItem>
        <SelectItem value="name-desc">Name: Z → A</SelectItem>
      </SelectContent>
    </Select>
  );
}
