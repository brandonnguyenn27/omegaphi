import { createClient } from "@/utils/supabase/server";
import React from "react";

const ProfilePage: React.FC = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("Error fetching current user:", userError);
    return <div>Error fetching user data or not authenticated.</div>;
  }

  const { id: userId, email } = user;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("first_name, last_name")
    .eq("id", userId)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError);
    return <div>Error fetching profile data.</div>;
  }

  return (
    <div className="">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold mb-4">User Profile</h1>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <p className="mt-1 text-gray-900">{email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name:
            </label>
            <p className="mt-1 text-gray-900">
              {profile?.first_name || "Not provided"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name:
            </label>
            <p className="mt-1 text-gray-900">
              {profile?.last_name || "Not provided"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
