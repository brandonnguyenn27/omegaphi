import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (!code) {
    console.error("Authorization code not found.");
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const supabase = await createClient();

  // Exchange the authorization code for a session
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
    code
  );
  if (exchangeError) {
    console.error("Error exchanging code for session:", exchangeError);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  // Retrieve the current authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("Error retrieving user after session exchange:", userError);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const { data: whitelist, error: whitelistError } = await supabase
    .from("email_whitelist")
    .select("email")
    .eq("email", user.email)
    .single();

  if (whitelistError || !whitelist) {
    console.error(
      "Unauthorized access: User's email is not in the whitelist.",
      whitelistError
    );
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      console.error("Error signing out unauthorized user:", signOutError);
    }
    return NextResponse.redirect(`${origin}/auth/unauthorized`);
  }

  // Parse full_name from user_metadata
  const fullName: string | undefined = user.user_metadata?.full_name;
  let given_name: string | undefined;
  let family_name: string | undefined;

  if (fullName) {
    // Split full_name into parts
    const nameParts = fullName.trim().split(" ");
    // Assume first part is first name, and the remainder is last name
    if (nameParts.length > 0) {
      given_name = nameParts.shift();
      family_name = nameParts.join(" ") || "";
    }
  }

  // Fetch the current profile from the profiles table
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError);
    // Optionally handle profile not found scenario
  } else if (profile) {
    // Check if first_name or last_name are missing in the profile
    const updates: Partial<{ first_name: string; last_name: string }> = {};
    if (!profile.first_name && given_name) {
      updates.first_name = given_name;
    }
    if (!profile.last_name && family_name) {
      updates.last_name = family_name;
    }

    // Update profile if there are changes to apply
    if (Object.keys(updates).length) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id);

      if (updateError) {
        console.error("Error updating profile:", updateError);
      } else {
        console.log("Profile updated successfully with first and last name");
      }
    }
  }

  // Determine redirect URL based on environment and headers
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";

  if (isLocalEnv) {
    return NextResponse.redirect(`${origin}${next}`);
  } else if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${next}`);
  } else {
    return NextResponse.redirect(`${origin}${next}`);
  }
}
