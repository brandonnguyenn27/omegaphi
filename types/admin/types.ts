export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
};

export type InterviewDay = {
  id: string;
  title: string;
  description: string | null;
  interview_date: string; // or Date if you parse on the server
  start_time: string; // "HH:MM:SS"
  end_time: string; // "HH:MM:SS"
  created_at: string | null;
  updated_at: string | null;
};
