export type SidebarItem = {
  title: string;
  url: string;
  icon: React.ElementType;
  subItem?: SidebarSubItem[];
};

export type SidebarSubItem = {
  title: string;
  url: string;
};

export type Interview = {
  id: string;
  user_id: string;
  interviewee_name: string;
  partner_name: string | null;
  start_time: string;
  end_time: string;
  interview_day_id: string | null;
};
