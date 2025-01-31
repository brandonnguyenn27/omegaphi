import { createClient } from "@/utils/supabase/server";

export default async function InterviewPage() {
  const supabase = await createClient();
  const { data: user_availabilities, error: user_availabilities_error } =
    await supabase.from("user_availabilities").select("*");
  if (user_availabilities_error) console.error(user_availabilities_error);

  if (!user_availabilities) {
    console.log("No user availabilities found");
  }
  const userIds = user_availabilities
    ? user_availabilities.map((user_availability) => user_availability.user_id)
    : [];
  const { data: profiles, error: profiles_error } = await supabase
    .from("profiles")
    .select("*")
    .in("id", userIds);
  if (profiles_error) console.error(profiles_error);

  const profilesWithAvailabilities = profiles
    ? profiles.map((profile) => ({
        ...profile,
        availabilities: user_availabilities?.filter(
          (availability) => availability.user_id === profile.id
        ),
      }))
    : [];

  console.log(JSON.stringify(profilesWithAvailabilities, null, 2));

  return (
    <div>
      <p>Hello</p>
    </div>
  );
}
