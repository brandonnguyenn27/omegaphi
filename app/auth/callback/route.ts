import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  console.log("Auth callback received. Code:", code, "Next:", next);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error);
    } else {
      console.log("Session exchange successful.");
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        console.log(
          "Local environment detected. Redirecting to:",
          `${origin}${next}`
        );
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        console.log(
          "Production environment. Using forwarded host for redirect:",
          `https://${forwardedHost}${next}`
        );
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        console.log("No forwarded host. Redirecting to:", `${origin}${next}`);
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  console.error("Code not found or session exchange failed.");
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
