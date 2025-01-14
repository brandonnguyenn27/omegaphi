"use client";
import React from "react";
import { signInWithGoogle } from "@/actions/auth";
import GoogleButton from "react-google-button";
import { Button } from "../ui/button";

export const GoogleSignIn = () => {
  return (
    <div>
      <form action={signInWithGoogle}>
        <Button
          type="submit"
          style={{ all: "unset" }}
          className="cursor-pointer inline-block"
        >
          <GoogleButton />
        </Button>
      </form>
    </div>
  );
};
