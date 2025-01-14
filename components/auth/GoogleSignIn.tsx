"use client";
import React from "react";
import { signInWithGoogle } from "@/actions/auth";
import { Button } from "../ui/button";

export const GoogleSignIn = () => {
  return (
    <div>
      <form action={signInWithGoogle}>
        <Button type="submit">Sign in with Google</Button>
      </form>
    </div>
  );
};
