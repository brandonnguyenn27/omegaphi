import { createClient } from "@/utils/supabase/server";

import { EventsCard } from "@/components/home/EventsCard";
import { AnnouncementsCard } from "@/components/home/AnnouncementCard";

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="container mx-auto p-6">
      {user ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <EventsCard />
            <AnnouncementsCard />
          </div>
        </div>
      ) : (
        <a href="/login">Log in</a>
      )}
    </div>
  );
}
