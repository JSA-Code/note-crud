"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RemoveBtn from "@/app/RemoveBtn";

export default function Editable({ notes }) {
  const router = useRouter();
  const [data, setData] = useState(notes);
  const [oldData, setOldData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      let foundOldData = JSON.parse(localStorage.getItem("oldData"));
      setOldData(foundOldData);
    }
  }, []);

  function isStateEqual() {
    if (JSON.stringify(oldData) === JSON.stringify(data)) {
      return true;
    }
    return false;
  }

  const onNotFocus = async (e, id) => {
    e.preventDefault();

    // console.log(JSON.stringify(oldData) === JSON.stringify(data));
    if (typeof window !== "undefined" && window.localStorage) {
      // console.log("INSIDE");
      localStorage.setItem("oldData", JSON.stringify(data));
      let foundOldData = JSON.parse(localStorage.getItem("oldData"));
      setOldData(foundOldData);
    }
    console.log(`IF EQUAL:\n${isStateEqual()}`);

    if (!(e.target.value.trim() === "") && !isStateEqual()) {
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
          <RemoveBtn id={note._id} />
        </div>
      ))}
    </>
  );
}
