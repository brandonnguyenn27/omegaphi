import { createClient } from "@/utils/supabase/server";
import React from "react";

const ProfilePage: React.FC = async () => {
  // Initialize Supabase server client
  const supabase = await createClient();

  // Retrieve the currently authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("Error fetching current user:", userError);
    return <div>Error fetching user data or not authenticated.</div>;
  }

  const { id: userId, email } = user;

  // Fetch profile details from 'profiles' table for the current user
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
    <div>
      <h1>User Profile</h1>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>First Name:</strong> {profile?.first_name || "Not provided"}
      </p>
      <p>
        <strong>Last Name:</strong> {profile?.last_name || "Not provided"}
      </p>
      {/* Future: Add UI for editing first and last name here */}
    </div>
  );
};

export default ProfilePage;
