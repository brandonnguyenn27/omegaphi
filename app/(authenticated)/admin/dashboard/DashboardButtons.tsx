"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AdminFeature {
  label: string;

  href: string;
}

interface DashboardButtonsProps {
  adminFeatures: AdminFeature[];
}

export default function DashboardButtons({
  adminFeatures,
}: DashboardButtonsProps) {
  return (
    <div
      className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-4
        "
    >
      {adminFeatures.map((feature) => (
        <Button
          asChild
          key={feature.href}
          className="
          flex
          items-center
          justify-center
          rounded
          border
          border-gray-200
         
          p-6
          text-center
          text-lg
          font-semibold
          shadow-sm
          hover:border-blue-300
          hover:bg-blue-50
          hover:text-blue-700
        "
        >
          <Link href={feature.href}>{feature.label}</Link>
        </Button>
      ))}
    </div>
  );
}
