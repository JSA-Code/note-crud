"use client";

import Link from "next/link";
import AddBtn from "./AddBtn";
import SignInBtn from "./SignInBtn";
import {
  HiMiniCircleStack,
  HiHome,
  HiUserGroup,
  HiUser,
  HiWrench,
} from "react-icons/hi2";

const navigation = [
  { name: "Home", href: "/", current: true, icon: HiHome },
  { name: "Local", href: "/local", current: false, icon: HiWrench },
  { name: "Client", href: "/client", current: false, icon: HiUser },
  { name: "Server", href: "/server", current: false, icon: HiUserGroup },
];

export default function Navbar() {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="mx-auto bg-gray-800 px-2">
      <div className="hidden sm:block">
        <div className="flex items-center justify-center space-x-10">
          <HiMiniCircleStack className="h-8 w-auto" />
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "rounded-md px-3 py-2 text-lg font-bold",
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.name}
            </Link>
          ))}
          <AddBtn />
          <SignInBtn />
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="fixed inset-x-0 bottom-0 block h-14 bg-slate-800 sm:hidden"
        id="mobile-menu"
      >
        <div className="flex h-full w-auto items-center justify-around">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center"
            >
              <item.icon size={35} />
              <span className="text-center text-sm font-semibold">
                {item.name}
              </span>
            </Link>
          ))}
          <AddBtn />
          <SignInBtn />
        </div>
        {/* <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-lg font-bold",
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.name}
            </Link>
          ))}
          <AddBtn />
          <SignInBtn />
        </div> */}
      </div>
    </div>
  );
}
