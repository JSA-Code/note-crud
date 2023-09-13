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
      <Menu as="div" className="relative inline-block text-left">
        <div>
          {!session ? (
            <button
              onClick={() => signIn("github")}
              className="rounded-xl bg-slate-200 bg-opacity-20 px-2 py-1 text-base font-bold text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Sign In
            </button>
          ) : (
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <div className="font-bold flex flex-row gap-2 items-center">
                <Image
                  className="w-8 h-8 rounded-full"
                  width={24}
                  height={24}
                  src={session.user.image}
                  alt={session.user.name}
                />
                {session.user.name}
                <HiChevronDown />
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
          <Menu.Items className="absolute right-0 mt-1 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <div className="px-2 py-2">
                <button
                  type="button"
                  className="hover:text-slate-400 duration-75 ease-in rounded-md text-sm text-center font-bold"
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
