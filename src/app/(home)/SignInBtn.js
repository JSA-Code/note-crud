"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function SignInBtn() {
  const { data: session } = useSession();

  return (
    <button
      type="button"
      className="rounded-md bg-slate-200 bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      onClick={() => {
        session ? signOut() : signIn("github");
      }}
    >
      {session ? "Sign Out" : "Sign In"}
    </button>
  );
}
