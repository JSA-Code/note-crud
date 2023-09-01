"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RemoveBtn from "@/app/RemoveBtn";

export default function Editable({ notes }) {
  const router = useRouter();
  const [data, setData] = useState(notes);
  // const [isSameTitle, setIsSameTitle] = useState(true);

  // useEffect(() => {
  //   console.log("USE EFFECT");
  //   setIsSameTitle(true);
  // }, [data]);

  const onNotFocus = async (e, id, isSameTitle) => {
    e.preventDefault();
    console.log();

    if (!(e.target.value.trim() === "")) {
      console.log("PUT REQUEST");
      try {
        const res = await fetch(`/api/notes/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newTitle: e.target.value }),
        });

        if (!res.ok) {
          throw new Error(`Failed to update note. Error: ${res.status}`);
        }
        router.refresh();
      } catch (error) {
        console.log(`Error while updating note: ${error}`);
      }
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      e.target.blur();
    }
  };

  return (
    <>
      {data.map((note) => (
        <div
          key={note._id}
          className="px-28 py-8 my-3 flex items-center justify-between bg-slate-700 border border-slate-300 text-slate-200 font-semibold"
        >
          <textarea
            className="resize-none break-words hover:bg-[#d3d3d3] hover:text-slate-900 focus:text-slate-900 hover:cursor-pointer focus:bg-[#d3d3d3] bg-transparent placeholder-slate-100 placeholder-opacity-30 hover:placeholder-transparent"
            placeholder="Enter Title"
            type="text"
            onFocus={(e) => (e.target.placeholder = "")}
            value={note.title}
            onChange={(e) =>
              setData(
                data.map((oNote) => {
                  if (oNote._id === note._id) {
                    // Create a *new* object with changes
                    // console.log(`CHANGED:\n${JSON.stringify(oNote)}`);
                    // setIsSameTitle(false);
                    return { ...oNote, title: e.target.value };
                  } else {
                    // No changes
                    // console.log(`NOT CHANGED:\n${JSON.stringify(oNote)}`);
                    return oNote;
                  }
                })
              )
            }
            onKeyDown={onKeyDown}
            onBlur={(e) => onNotFocus(e, note._id)}
          />
          <RemoveBtn id={note._id} />
        </div>
      ))}
    </>
  );
}
