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
  is_scheduled?: boolean;
};

export type RusheeAvailability = {
  id: string;
  rushee_id: string;
  start_time: string;
  end_time: string;
  created_at?: string;
  updated_at?: string;
  booked: boolean;
};

export type UserAvailability = {
  id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  interview_day_id: string;
  created_at?: string;
  updated_at?: string;
};

export type UserAvailabilityExtended = {
  id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  interview_day_id?: string;
  created_at?: string;
  updated_at?: string;

  profiles: {
    first_name: string;
    last_name: string;
  };
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
  is_scheduled: boolean;
  rushees: {
    first_name: string;
    last_name: string;
  };
};

export interface RusheeAvailabilityScheduler {
  id: string;
  start_time: string;
  end_time: string;
  rushees: {
    first_name: string;
    last_name: string;
  };
}

export interface Interview {
  id: string;
  user_id: string;
  interviewee_name: string;
  partner_name: string | null;
  start_time: string; // ISO string representing timestamp with time zone
  end_time: string; // ISO string representing timestamp with time zone
  created_at: string | null;
  updated_at: string | null;
  interview_day_id: string | null;
  rushee_id: string;
}

export interface UserAvailabilityScheduler {
  id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  profiles: {
    first_name: string;
    last_name: string;
  };
}

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: string | null;
  created_at: string | null;
}
