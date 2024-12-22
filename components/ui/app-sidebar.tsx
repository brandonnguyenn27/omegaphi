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
import { SidebarItem } from "@/types/ui/types";
import { Plus } from "lucide-react";

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
          {item.title}
          <Plus className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul>
          {item.subItem?.map((subItem) => (
            <SidebarMenuItem key={subItem.title}>
              <SidebarMenuButton asChild className="pl-4">
                <a href={subItem.url}>
                  <span>{subItem.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
