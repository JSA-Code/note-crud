"use client";

import { useSession } from "next-auth/react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { usePathname } from "next/navigation";
import { HiPlusCircle } from "react-icons/hi2";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function AddBtn() {
  const pathname = usePathname();
  const { data: session } = useSession();
  let [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  // const notify = () => {
  //   toast("Updated Successfully!");
  // };

  function closeModal() {
    setIsOpen(false);
    setTimeout(() => {
      setTitle("");
    }, 200);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      return alert("Title cannot be empty");
    }

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, email: session.user.email }),
      });

      // console.log(`RES OK\n${res.ok}`);
      // console.log(res);

      if (res.ok) {
        window.location.reload();
        // notify();
      } else {
        closeModal();
        const { message } = await res.json();
        alert(message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      {session && pathname !== "/local" && pathname !== "/" && (
        <button
          type="button"
          onClick={openModal}
          className=""
          // className="rounded-xl bg-slate-200 bg-opacity-20 px-2 py-1 text-base font-bold text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <div className="flex flex-col items-center text-slate-50 hover:text-slate-300">
            <HiPlusCircle size={35} />
            <span className="text-center text-sm font-semibold">Add</span>
          </div>
        </button>
      )}
      {/* <ToastContainer /> */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            {/* min-h-full items-center */}
            <div className="mt-28 flex justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-slate-700 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-100"
                  >
                    Create your new note below
                  </Dialog.Title>
                  <div className="my-2">
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-3"
                    >
                      <input
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className="border border-slate-100 bg-slate-300 px-8 py-2 font-medium text-slate-900 placeholder:text-slate-900 placeholder:text-opacity-70"
                        type="text"
                        placeholder="Notes Title"
                      />
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-500 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="rounded-md bg-slate-500 px-4 py-2 text-sm font-medium text-white hover:bg-slate-500/30 focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75"
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
