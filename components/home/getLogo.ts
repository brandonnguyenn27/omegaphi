import { createClient } from "@/utils/supabase/client";

export async function getLogo() {
  const supabase = await createClient();
  const { data } = await supabase.storage
    .from("images")
    .getPublicUrl("omegaphilogo.png");

  return data;
}
