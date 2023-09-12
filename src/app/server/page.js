// import Notes from "../client/Notes";
import { getServerSession } from "next-auth";
import Note from "@/models/note";
import DeleteBtn from "@/components/DeleteBtn";
import EditBtn from "./EditBtn";

export default async function HomeServer() {
  const session = await getServerSession();

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
    <div className="flex mt-10">
      <p className="font-bold">
        Here we are performing server-side data fetching.
      </p>
      <ul className="flex flex-col items-center justify-center">
        {notes.map((note) => (
          <div
            key={note._id}
            className="px-28 py-8 my-3 flex justify-between items-center bg-slate-700 text-slate-200 font-semibold border"
          >
            <div className="resize-none break-words bg-transparent placeholder-slate-100 placeholder-opacity-30">
              {note.title}
            </div>
            <EditBtn note={note} />
            <DeleteBtn id={note._id} />
          </div>
        ))}
      </ul>
    </div>
  );
}
