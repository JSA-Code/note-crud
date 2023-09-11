"use client";

import useSWR from "swr";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import DeleteBtn from "@/components/DeleteBtn";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function HomeClient() {
  const { data, isLoading } = useSWR("/api/notes", fetcher);
  const { status } = useSession();
  const [notes, setNotes] = useState();
  const isStateEqual = () =>
    localStorage.getItem("oldNotes") === JSON.stringify(notes);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage && data) {
      setNotes(data?.notes);
      localStorage.setItem("oldNotes", JSON.stringify(data?.notes));
    }
    console.log("USE EFFECT");
  }, [data]);

  const onNotFocus = async (e, id) => {
    e.preventDefault();
    console.log(`IS STATE EQUAL:\n${isStateEqual()}`);

    if (!e.target.value) {
      e.target.placeholder = "Enter Title";
    }

    if (!isStateEqual()) {
      console.log("PUT REQUEST");
      try {
        await fetch("/api/notes/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id, newTitle: e.target.value }),
        });
        // window.location.reload();
        // router.refresh();

        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.setItem("oldNotes", JSON.stringify(notes));
          // console.log(`OLD NOTES:\n${localStorage.getItem("oldNotes")}`);
          // console.log(`NOTES:\n${JSON.stringify(notes)}`);
        }
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
      <p className="flex justify-center items-center mt-28 text-center font-semibold">
        Authenticating...
      </p>
    );
  }

  if (status !== "authenticated") {
    return (
      <div className="flex justify-center items-center mt-28 text-center font-semibold">
        <p className="pulse-animation">
          Not signed in.
          <br />
          Please sign in to continue
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <p className="flex justify-center items-center mt-28 text-center font-semibold">
        Loading data...
      </p>
    );
  }

  return (
    <>
      {notes?.map((note) => (
        <div
          key={note._id}
          className="px-28 py-8 my-3 flex items-center justify-between bg-slate-700 border border-slate-300 text-slate-200 font-semibold"
        >
          <textarea
            className="transition ease-in duration-100 resize-none break-words hover:bg-[#d3d3d3] hover:text-slate-900 focus:text-slate-900 hover:cursor-pointer focus:bg-[#d3d3d3] bg-transparent placeholder-slate-100 placeholder-opacity-30 hover:placeholder-transparent"
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
                })
              )
            }
            onKeyDown={onKeyDown}
            onBlur={(e) => onNotFocus(e, note._id)}
          />
          <DeleteBtn id={note._id} />
        </div>
      ))}
    </>
  );
}
