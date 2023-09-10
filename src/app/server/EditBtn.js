"use client";

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { putAction } from "@/libs/actions";
import { HiPencilAlt } from "react-icons/hi";

export default function EditBtn({ note }) {
  let [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [oldTitle, setOldTitle] = useState(note.title);
  const router = useRouter();

  // console.log(`NOTE:\n${JSON.stringify(note._id)}`);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    // console.log(`NOTE:\n${JSON.stringify(note)}`);
    // console.log(`NOTE:\n${JSON.stringify(title)}`);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(`DOES TITLE MATCH:\n${title === oldTitle}`);

    if (title !== oldTitle) {
      console.log("PUT REQUEST");
      try {
        const checkRes = await putAction(note._id, title);

        if (!checkRes) {
          throw new Error(res.status);
        }

        setOldTitle(title);
        router.refresh();
      } catch (error) {
        console.log(`Cannot update due to ${error}`);
      }
    }
    closeModal();
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="font-bold text-white py-3 px-6 w-fit"
      >
        <HiPencilAlt size={24} />
      </button>

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
            <div className="fixed inset-0 bg-slate-900 bg-opacity-50 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            {/* min-h-full items-center */}
            <div className="flex mt-28 justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-700 p-6 text-left align-middle shadow-xl transition-all">
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
                        className="border border-slate-100 px-8 py-2 bg-slate-300 placeholder-slate-900 placeholder-opacity-70 font-medium text-slate-900"
                        type="text"
                        placeholder="Notes Title"
                      />
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-100 hover:text-slate-900 hover:bg-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="rounded-md bg-slate-200 bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
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
    </div>
  );
}
