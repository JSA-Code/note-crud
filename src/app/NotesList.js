import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const getNotes = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/notes", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch notes. Error: ${res.status}`);
    }
    // const data = await res.json();

    // console.log(`RES HERE:\n${res}`);
    // console.log(`DATA HERE:\n${res.json()}`);
    // console.log(`DATA:\n${data.notes}`);
    // parse json data
    // const notes = JSON.parse(data.notes);
    // console.log(`NOTES:\n${JSON.stringify(res.json())}`);

    return res.json();
  } catch (error) {
    console.log(`Error while loading notes, ${error}`);
  }
};

// export noteslist component
export default async function NotesList() {
  const { notes } = await getNotes();
  // console.log(`NOTES:\n${notes}`);
  // console.log(`NOTES:\n${JSON.stringify(notes)}`);
  return (
    // <></>
    <>
      {notes.map((note) => (
        <div
          key={note._id}
          className="p-4 border border-slate-300 my-3 flex justify-between items-start bg-slate-700"
        >
          <div>
            <h2 className="font-bold text-2xl">{note.title}</h2>

            <div>{note.description}</div>
          </div>

          <div className="flex gap-2">
            {/* /edit-note/${note._id} */}
            <Link href={`/edit/${note._id}`}>
              <HiPencilAlt size={24} />
            </Link>
            <RemoveBtn id={note._id} />
          </div>
        </div>
      ))}
    </>
  );
}
