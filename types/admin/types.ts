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

export type Rushee = {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
};

export type RusheeAvailability = {
  id: string;
  rushee_id: string;
  start_time: string;
  end_time: string;
  created_at?: string;
  updated_at?: string;
};

export type Availability = {
  id: string;
  rushee_id: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
};

export type AvailabilityExtended = {
  id: string;
  rushee_id: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
  rushees: {
    first_name: string;
    last_name: string;
  };
};
