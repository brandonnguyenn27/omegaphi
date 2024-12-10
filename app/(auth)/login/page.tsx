import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { login, signup } from "./actions";

export default async function LoginPage() {
  const supabase = await createClient();

  // Check if user is already logged in
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect to dashboard if session exists
  if (session) {
    redirect("/dashboard");
  }

  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
