// import Notes from "../client/Notes";
import { useSession, signIn, signOut } from "next-auth/react";
import DeleteBtn from "@/app/client/DeleteBtn";

export default async function HomeServer() {
  const getNotes = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/notes", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch notes. Error: ${res.status}`);
      }

      return res.json();
    } catch (error) {
      console.log(`Error while loading notes, ${error}`);
    }
  };

  const { notes } = await getNotes();
  return (
    <>
      {notes.map((note) => (
        <div
          key={note._id}
          className="px-28 py-8 my-3 flex items-center justify-between bg-slate-700 border border-slate-300 text-slate-200 font-semibold"
        >
          <textarea
            className="transition ease-in duration-100 resize-none break-words hover:bg-[#d3d3d3] hover:text-slate-900 focus:text-slate-900 hover:cursor-pointer focus:bg-[#d3d3d3] bg-transparent placeholder-slate-100 placeholder-opacity-30 hover:placeholder-transparent"
            placeholder="Enter Title"
            type="text"
            // onFocus={(e) => (e.target.placeholder = "")}
            // value={note.title}
            // onChange={(e) =>
            //   setData(
            //     data.map((oNote) => {
            //       if (oNote._id === note._id) {
            //         return { ...oNote, title: e.target.value };
            //       } else {
            //         // No changes
            //         return oNote;
            //       }
            //     })
            //   )
            // }
            // onKeyDown={onKeyDown}
            // onBlur={(e) => onNotFocus(e, note._id)}
          />
          <DeleteBtn id={note._id} />
        </div>
      ))}
    </>
  );
}
