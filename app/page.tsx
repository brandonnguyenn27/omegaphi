import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import Header from "@/components/home/Header";
import Link from "next/link";

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div>
      <Header />
      {session ? (
        <div>
          <h1>Welcome to the Home Page</h1>
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        </div>
      ) : (
        <a href="/login">Log in</a>
      )}
    </div>
  );
}
