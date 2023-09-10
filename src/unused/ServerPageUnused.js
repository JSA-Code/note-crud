// import Notes from "../client/Notes";
import { getServerSession } from "next-auth";
import Note from "@/models/note";
import DeleteBtn from "@/app/client/DeleteBtn";
import EditBtn from "./EditBtn";

// const getNotes = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/api/notes", {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error(`Failed to fetch notes. Error: ${res.status}`);
//     }

//     return res.json();
//   } catch (error) {
//     console.log(`Error while loading notes, ${error}`);
//   }
// };

export default async function HomeServer() {
  const session = await getServerSession();
  // const { notes } = await getNotes();

  if (!session) {
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

  const notes = JSON.parse(JSON.stringify(await Note.find({})));
  // console.log(`DATA\n${JSON.stringify(notes)}`);
  return (
    <>
      {notes.map((note) => (
        <div
          key={note._id}
          className="px-28 py-8 my-3 flex items-center justify-between bg-slate-700 text-slate-200 font-semibold border"
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
