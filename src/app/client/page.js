"use client";

import useSWR from "swr";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import DeleteBtn from "@/components/DeleteBtn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function HomeClient() {
  const { data, isLoading } = useSWR("/api/notes", fetcher);
  const { status } = useSession();
  const [notes, setNotes] = useState();
  const notify = () => {
    toast.success("Updated Successfully!");
  };
  const isStateEqual = () =>
    localStorage.getItem("oldNotes") === JSON.stringify(notes);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage && data) {
      setNotes(data?.notes);
      localStorage.setItem("oldNotes", JSON.stringify(data?.notes));
    }
    // console.log("USE EFFECT");
  }, [data]);

  const onNotFocus = async (e, id) => {
    e.preventDefault();
    // console.log(`IS STATE EQUAL:\n${isStateEqual()}`);

    if (!e.target.value) {
      e.target.placeholder = "Enter Title";
    }

    if (!isStateEqual()) {
      // console.log("PUT REQUEST");
      try {
        await fetch("/api/notes/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, newTitle: e.target.value }),
        });

        notify();

        // if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("oldNotes", JSON.stringify(notes));
        // console.log(`OLD NOTES:\n${localStorage.getItem("oldNotes")}`);
        // console.log(`NOTES:\n${JSON.stringify(notes)}`);
        // }
      } catch (error) {
        console.log(`Cannot update due to ${error}`);
      }
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      e.target.blur();
    }
  };

  if (status === "loading") {
    return (
      <div className="mt-28 flex items-center justify-center text-center font-semibold">
        <svg
          aria-hidden="true"
          className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-200"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>

        <p>Loading...</p>
      </div>
    );
  }

  if (status !== "authenticated") {
    return (
      <div className="pulse-animation mt-28 flex items-center justify-center">
        <p className="text-center text-xl font-semibold">
          Not signed in.
          <br />
          Please sign in to continue
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-28 flex items-center justify-center text-center font-semibold">
        <svg
          aria-hidden="true"
          className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-200"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <p>Loading data...</p>
      </div>
    );
  }

  const notesList = notes?.map((note) => (
    <li key={note._id}>
      <div className="my-3 flex items-center border bg-slate-700 px-10 py-8 font-semibold text-slate-200">
        <textarea
          className="resize-none break-words bg-transparent transition duration-100 ease-in placeholder:text-slate-100 placeholder:text-opacity-30 hover:cursor-pointer hover:bg-[#d3d3d3] hover:text-slate-900 hover:placeholder:text-transparent focus:bg-[#d3d3d3] focus:text-slate-900"
          placeholder="Enter Title"
          type="text"
          onFocus={(e) => (e.target.placeholder = "")}
          value={note.title}
          onChange={(e) =>
            setNotes(
              notes.map((oNote) => {
                if (oNote._id === note._id) {
                  return { ...oNote, title: e.target.value };
                } else {
                  // No changes
                  return oNote;
                }
              }),
            )
          }
          onKeyDown={onKeyDown}
          onBlur={(e) => onNotFocus(e, note._id)}
        />
        <DeleteBtn id={note._id} />
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
      <div className="mt-10 flex gap-10">
        <p className="font-bold">
          This is a protected page provided by NextAuthJs. Our API is also
          protected to ensure that only authenticated users can access it. Here
          we are performing client-side data fetching by utilizing useSWR and
          our API on the server. It also has the ability to store data in local
          storage and compare it to the current state of the data. If the data
          is different, then we make a PUT request to update the data in the
          MongoDB database. To save the data, we use the onBlur event handler to
          save the data when the user clicks outside of the textarea and we can
          also use the onKeyDown event handler which is activated when the user
          presses the Enter or Escape key.
        </p>
        <ul className="flex flex-col items-baseline">{notesList}</ul>
      </div>
    </div>
  );
}
