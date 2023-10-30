import { getServerSession } from "next-auth";
import NoteModel from "@/models/note";
import DeleteBtn from "@/components/DeleteBtn";
import EditBtn from "./EditBtn";

export default async function Notes() {
  const session = await getServerSession();

  if (!session) {
    return (
      <div className="pulse-animation mt-28 flex items-center justify-center">
        <p className="text-center text-2xl font-semibold">
          Not signed in.
          <br />
          Please sign in to continue
        </p>
      </div>
    );
  }

  const notes = JSON.parse(
    JSON.stringify(await NoteModel.find({ email: session.user.email })),
  );
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <ul className="flex flex-col items-center">
      {notes.map((note) => (
        <li key={note._id}>
          <div className="my-1 flex h-28 w-64 items-center justify-between overflow-y-auto border bg-slate-700">
            <p className="break-words font-semibold text-slate-200 placeholder:text-slate-100 placeholder:text-opacity-30">
              {note.title}
            </p>
            <EditBtn note={note} />
            <DeleteBtn id={note._id} />
          </div>
        </li>
      ))}
    </ul>
  );
}
