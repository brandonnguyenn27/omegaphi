import { createClient } from "@/utils/supabase/server";

export async function isAdmin(): Promise<boolean> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) return false;

  const { data, error } = await supabase.rpc("is_admin", {
    p_user_id: user.id,
  });

  if (error) {
    console.error("Error checking admin status:", error);
    return false;
  }

  return data === true;
}
