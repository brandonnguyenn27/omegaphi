import Header from "@/components/home/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

import { HomeIcon, DashboardIcon, CalendarIcon } from "@radix-ui/react-icons";
import { SidebarItem } from "@/types/ui/types";

const items: SidebarItem[] = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: DashboardIcon,
  },
  {
    title: "Events",
    url: "/admin/events",
    icon: CalendarIcon,
  },
  {
    title: "Rush",
    url: "/rush",
    icon: CalendarIcon,
    subItem: [
      {
        title: "Interviews",
        url: "/rush/interviews",
      },
      {
        title: "Another Route",
        url: "/rush/another-route",
      },
    ],
  },
];

export default function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar items={items} />
        <div className="flex-1 w-0 min-w-0">
          <Header />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
