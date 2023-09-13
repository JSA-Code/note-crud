// import Notes from "../client/Notes";
import { getServerSession } from "next-auth";
import Note from "@/models/note";
import DeleteBtn from "@/components/DeleteBtn";
import EditBtn from "./EditBtn";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default async function HomeServer() {
  const session = await getServerSession();
  // const notify = async () => {
  //   "use server";
  //   return toast("Wow so easy !");
  // };

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

  const notes = JSON.parse(
    JSON.stringify(await Note.find({ email: session.user.email }))
  );
  // console.log(`DATA\n${JSON.stringify(notes)}`);

  const listNotes = notes.map((note) => (
    <li key={note._id}>
      <div className="px-28 py-8 my-3 flex justify-between items-center bg-slate-700 text-slate-200 font-semibold border">
        <div className="resize-none break-words bg-transparent placeholder-slate-100 placeholder-opacity-30">
          {note.title}
        </div>
        <EditBtn note={note} />
        <DeleteBtn id={note._id} />
        {/* <EditBtn note={note} notify={notify} /> */}
        {/* <ToastContainer /> */}
      </div>
    </li>
  ));

  return (
    <div className="flex gap-10 mt-10">
      <p className="font-bold">
        Here we are performing server-side data fetching.
      </p>
      <ul className="flex flex-col items-center">{listNotes}</ul>
    </div>
  );
}
