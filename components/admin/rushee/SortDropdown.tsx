"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "newest";

  const handleChange = (newSort: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (newSort && newSort !== "newest") {
      newSearchParams.set("sort", newSort);
    } else {
      newSearchParams.delete("sort");
    }
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <Select value={currentSort} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="oldest">Oldest</SelectItem>
        <SelectItem value="name">Name</SelectItem>
      </SelectContent>
    </Select>
  );
}
