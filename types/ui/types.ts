export interface SidebarItem {
  title: string;
  url: string;
  icon: React.ElementType;
  subItem?: SidebarSubItem[];
}

export interface SidebarSubItem {
  title: string;
  url: string;
}
