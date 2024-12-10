import { createClient } from "@/utils/supabase/server";
import { signOut } from "./actions";

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>

      {session ? (
        <form action={signOut}>
          <button>Sign Out</button>
        </form>
      ) : (
        <a href="/login">Log in</a>
      )}
    </div>
  );
}
