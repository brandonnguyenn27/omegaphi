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

export async function getRole(): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.rpc("get_user_role", {
    p_user_id: user?.id,
  });
  if (error) console.error(error);
  else console.log(data);

  return data;
}
