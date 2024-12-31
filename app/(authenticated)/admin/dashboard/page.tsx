"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const adminFeatures = [
  { label: "Interviews", href: "/admin/interviews" },
  { label: "Rushees", href: "/admin/rushees" },
  { label: "Interview Dates", href: "/admin/interview-dates" },
  { label: "Events", href: "/admin/events" },
  // As the app grows, add more features...
];
export default function AdminDashboard() {
  return (
    <section className="min-h-screen  p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <p className="mb-6 text-gray-700">Select a feature to manage:</p>

        {/* Responsive grid that can have up to 4 columns */}
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
      </div>
    </section>
  );
}
