// import Notes from "../client/Notes";
import { useSession, signIn, signOut } from "next-auth/react";
import DeleteBtn from "@/app/client/DeleteBtn";
import EditBtn from "./EditBtn";

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
          className="px-28 py-8 my-3 flex items-center justify-between bg-slate-700 text-slate-200 font-semibold"
        >
          <div className="resize-none break-words bg-transparent placeholder-slate-100 placeholder-opacity-30">
            {note.title}
          </div>
          <div className="flex">
            <EditBtn note={note} />
            <DeleteBtn id={note._id} />
          </div>
        </div>
      ))}
    </>
  );
}
