// // import Notes from "../client/Notes";
// // import { getServerSession } from "next-auth";
// // import Note from "@/models/note";
// // import DeleteBtn from "@/components/DeleteBtn";
// // import EditBtn from "./EditBtn";
// import Skeleton from "@/components/Skeleton";
// import Notes from "./Notes";
// import { Suspense } from "react";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// export default async function HomeServer() {
//   // const session = await getServerSession();
//   // const notify = async () => {
//   //   "use server";
//   //   return toast("Wow so easy !");
//   // };

//   // if (!session) {
//   //   return (
//   //     <div className="pulse-animation mt-28 flex items-center justify-center">
//   //       <p className="text-center text-2xl font-semibold">
//   //         Not signed in.
//   //         <br />
//   //         Please sign in to continue
//   //       </p>
//   //     </div>
//   //   );
//   // }

//   // const notes = JSON.parse(
//   //   JSON.stringify(await Note.find({ email: session.user.email })),
//   // );
//   // console.log(`DATA\n${JSON.stringify(notes)}`);

//   // const listNotes = notes.map((note) => (
//   //   <li key={note._id}>
//   //     <div className="my-3 flex items-center justify-between border bg-slate-700 px-28 py-8 font-semibold text-slate-200">
//   //       <div className="resize-none break-words bg-transparent placeholder:text-slate-100 placeholder:text-opacity-30">
//   //         {note.title}
//   //       </div>
//   //       <EditBtn note={note} />
//   //       <DeleteBtn id={note._id} />
//   //       {/* <EditBtn note={note} notify={notify} /> */}
//   //       {/* <ToastContainer /> */}
//   //     </div>
//   //   </li>
//   // ));

//   return (
//     <div className="flex flex-col items-center gap-x-10 border pt-5 sm:flex-row sm:justify-center">
//       <p className="text-center font-bold md:text-left">
//         Here we are performing server-side data fetching.
//       </p>
//       <Suspense fallback={<Skeleton />}>
//         <Notes />
//       </Suspense>
//     </div>
//   );
// }
