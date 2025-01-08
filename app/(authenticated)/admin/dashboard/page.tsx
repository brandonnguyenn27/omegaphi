const adminFeatures = [
  { label: "Scheduler", href: "/admin/scheduler" },
  { label: "Rushees", href: "/admin/rushees" },
  { label: "Interview Dates", href: "/admin/interview-dates" },
  { label: "Events", href: "/admin/events" },
];

import DashboardButtons from "./DashboardButtons";

export default function AdminDashboard() {
  return (
    <section className="min-h-screen  p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <p className="mb-6 text-gray-700">Select a feature to manage:</p>
        <DashboardButtons adminFeatures={adminFeatures} />
      </div>
    </section>
  );
}
