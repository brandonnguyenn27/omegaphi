import Header from "@/components/home/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

import { HomeIcon, DashboardIcon, CalendarIcon } from "@radix-ui/react-icons";
import { SidebarItem } from "@/types/ui/types";
import { getRole } from "@/utils/auth";

const items: SidebarItem[] = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon,
    roles: ["admin", "user"],
  },
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: DashboardIcon,
    roles: ["admin"],
  },

  {
    title: "Rush",
    url: "/rush",
    icon: CalendarIcon,
    roles: ["admin", "user"],
    subItem: [
      {
        title: "Interviews",
        url: "/rush/interviews",
        roles: ["admin", "user"],
      },
    ],
  },
  {
    title: "Admin",
    url: "/admin",
    icon: CalendarIcon,
    roles: ["admin"],
    subItem: [
      {
        title: "Scheduler",
        url: "/admin/scheduler",
        roles: ["admin"],
      },
      {
        title: "Availability",
        url: "/admin/availability",
        roles: ["admin"],
      },
      {
        title: "Rushees",
        url: "/admin/rushees",
        roles: ["admin"],
      },
      {
        title: "Interview Dates",
        url: "/admin/interview-dates",
        roles: ["admin"],
      },
      {
        title: "Events",
        url: "/admin/events",
        roles: ["admin"],
      },
      {
        title: "Whitelist",
        url: "/admin/whitelist",
        roles: ["admin"],
      },
    ],
  },
];

const logoUrl =
  "https://xvibzpkqqwyevevkcemr.supabase.co/storage/v1/object/sign/images/omegaphilogo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvb21lZ2FwaGlsb2dvLnBuZyIsImlhdCI6MTczNDkxNTE1OSwiZXhwIjoyMDUwMjc1MTU5fQ.sECOJ4JCqFkfSh8JA53JeUwLgb3-FRX-cd0LMRcZkAA";

export default async function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await getRole();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar items={items} role={role} />
        <div className="flex-1 w-0 min-w-0">
          <Header logoUrl={logoUrl} />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
