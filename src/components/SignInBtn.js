"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiChevronDown } from "react-icons/hi";

export default function SignInBtn() {
  const { data: session } = useSession();

  return (
    <>
      <Menu as="menu" className="relative inline-block">
        <div>
          {!session ? (
            <button
              onClick={() => signIn("github")}
              className="rounded-xl bg-slate-700 px-2 py-1 text-base font-bold text-slate-50 hover:bg-slate-700/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Sign In
            </button>
          ) : (
            <Menu.Button className="inline-flex w-full justify-center rounded-md text-sm font-medium text-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
              <div className="flex flex-row items-center gap-1 font-bold">
                <Image
                  className="h-8 w-auto rounded-full"
                  width={24}
                  height={24}
                  src={session.user.image}
                  alt={session.user.name}
                />

                <span className="mt-1 hidden sm:block">
                  {session.user.name}
                </span>
                <HiChevronDown className="mt-1 h-5 w-auto" />
              </div>
            </Menu.Button>
          )}
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute bottom-full right-0 mt-1 w-full origin-bottom-right divide-y divide-gray-100 rounded-md bg-slate-800 shadow-lg ring-1 ring-black/5 focus:outline-none sm:-bottom-full">
            <Menu.Item>
              <div className="p-2">
                <button
                  type="button"
                  className="rounded-md text-center text-base font-bold duration-75 ease-in hover:text-slate-400"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              </div>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
