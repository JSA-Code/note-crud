"use client";

import { signIn } from "next-auth/react";

export default function SignUpBtn() {
  return (
    <>
      <button
        type="submit"
        onClick={() => signIn("github")}
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Sign Up
      </button>
      <p className="mt-10 text-center text-sm text-gray-500">
        <a
          onClick={() => signIn("github")}
          className="font-semibold leading-6 text-indigo-600 hover:cursor-pointer hover:text-indigo-500"
        >
          Already have an account? Sign in
        </a>
      </p>
    </>
  );
}
