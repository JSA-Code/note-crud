"use client";

import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HiOutlineTrash } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HomeLocal() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  let [isOpen, setIsOpen] = useState(false);
  const isStateEqual = () =>
    localStorage.getItem("LocalNotes") === JSON.stringify(notes);
  const notify = () => {
    toast.success("Updated Successfully!");
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("LocalNotes")) || [];
    if (typeof window !== "undefined" && window.localStorage) {
      setNotes(data);
    }
    // console.log("USE EFFECT");
  }, []);

  function closeModal() {
    setIsOpen(false);
    setTimeout(() => {
      setTitle("");
    }, 200);
  }

  function openModal() {
    setIsOpen(true);
  }

  const onNotFocus = async (e) => {
    e.preventDefault();

    if (!e.target.value) {
      e.target.placeholder = "Enter Title";
    }

    if (!isStateEqual()) {
      notify();
      // if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("LocalNotes", JSON.stringify(notes));
      // }
      // console.log(`NOTES:\n${JSON.stringify(notes)}`);
      // }
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      e.target.blur();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotes([...notes, title]);
    localStorage.setItem("LocalNotes", JSON.stringify([...notes, title]));
    closeModal();
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
    localStorage.setItem("LocalNotes", JSON.stringify(newNotes));

    // setNotes(notes.filter((_, i) => i !== index));
    // console.log(`NOTES:\n${JSON.stringify([...notes])}`);
    // localStorage.setItem("LocalNotes", JSON.stringify(notes));
  };

  const notesList = notes?.map((note, index) => (
    <li key={index}>
      <div className="my-3 flex items-center border bg-slate-700 px-10 py-8 font-semibold text-slate-200">
        <textarea
          className="resize-none break-words bg-transparent transition duration-100 ease-in placeholder:text-slate-100 placeholder:text-opacity-30 hover:cursor-pointer hover:bg-[#d3d3d3] hover:text-slate-900 hover:placeholder:text-transparent focus:bg-[#d3d3d3] focus:text-slate-900"
          placeholder="Enter Title"
          type="text"
          onFocus={(e) => (e.target.placeholder = "")}
          value={note}
          onChange={(e) =>
            setNotes(
              notes.map((oNote, i) => {
                if (index === i) {
                  return e.target.value;
                } else {
                  // No changes
                  return oNote;
                }
              }),
            )
          }
          onKeyDown={onKeyDown}
          onBlur={onNotFocus}
        />
        <button className="ml-4 text-red-500" onClick={() => deleteNote(index)}>
          <HiOutlineTrash size={24} />
        </button>
      </div>
    </li>
  ));

  return (
    <div className="mx-4">
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />

      <button
        type="button"
        onClick={openModal}
        className="mt-4 rounded-xl bg-slate-700 px-2 py-1 text-base font-bold text-slate-50 hover:bg-slate-700/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        Local Add Note
      </button>

      <div className="mt-10 flex gap-10">
        <p className="font-bold">
          This is not a protected page provided by NextAuthJs. We are using
          local storage to store the data
        </p>
        <ul className="flex flex-col items-baseline">{notesList}</ul>
      </div>

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
    </div>
  );
}
