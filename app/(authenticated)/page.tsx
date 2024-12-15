import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { isAdmin } from "@/utils/auth";

export default async function HomePage() {
  const supabase = await createClient();
  const isUserAdmin = await isAdmin();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome to the Home Page</h1>
          <div className="space-x-4">
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
            {isUserAdmin && (
              <Link href="/admin/events">
                <Button variant="outline">Manage Events</Button>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <a href="/login">Log in</a>
      )}
    </div>
  );
}
