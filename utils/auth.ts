import { createClient } from "@/utils/supabase/server";

export async function isAdmin(): Promise<boolean> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return false;

  const { count, error } = await supabase
    .from("admins")
    .select("*", { count: "exact", head: true })
    .eq("email", user.email);

  if (error) {
    console.error("Error checking admin status:", error);
    return false;
  }

  return count === 1;
}
