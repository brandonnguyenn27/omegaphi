import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { HomeIcon, DashboardIcon, CalendarIcon } from "@radix-ui/react-icons";

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ElementType;
  subItem?: SidebarSubItem[];
}

interface SidebarSubItem {
  title: string;
  url: string;
}

interface CollapsibleMenuItemProps {
  item: SidebarItem;
}

export function AppSidebar({ items = [] }: { items: SidebarItem[] }) {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.subItem ? (
                  <CollapsibleMenuItem item={item} />
                ) : (
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="h-4 w-4 mr-2" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

function CollapsibleMenuItem({ item }: { item: SidebarItem }) {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton>
          <item.icon className="h-4 w-4 mr-2" />
          <span>{item.title}</span>
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {item.subItem?.map((subItem) => (
          <SidebarMenuItem key={subItem.title}>
            <SidebarMenuButton asChild>
              <a href={subItem.url}>
                <span>{subItem.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
