// "use client";

// import useSWR from "swr";
// import { useState, useEffect } from "react";
// import { putAction } from "@/libs/actions";
// import { useRouter } from "next/navigation";
// import DeleteBtn from "@/components/DeleteBtn";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

// export default function HomeClient() {
//   const { data, error, isLoading } = useSWR("/api/notes", fetcher);
//   const [notes, setNotes] = useState();
//   const [oldNotes, setOldNotes] = useState();
//   const isStateEqual = () => JSON.stringify(notes) === JSON.stringify(oldNotes);
//   // const router = useRouter();

//   useEffect(() => {
//     if (typeof window !== "undefined" && window.localStorage && data) {
//       // let foundOldNotes = JSON.parse(localStorage.getItem("oldNotes"));
//       setNotes(data?.notes);
//       setOldNotes(data?.notes);
//     }
//     console.log("USE EFFECT");
//   }, [data]);

//   const onNotFocus = async (e, id) => {
//     e.preventDefault();

//     if (typeof window !== "undefined" && window.localStorage) {
//       localStorage.setItem("oldNotes", JSON.stringify(notes));
//       let foundOldNotes = JSON.parse(localStorage.getItem("oldNotes"));
//       console.log(`LOCAL OLD NOTES:\n${localStorage.getItem("oldNotes")}`);
//       setOldNotes(foundOldNotes);
//     }

//     // if (!isStateEqual()) {
//     //   console.log("PUT REQUEST");
//     //   try {
//     //     const checkRes = await putAction(id, e.target.value);

//     //     if (!checkRes) {
//     //       throw new Error(`Failed to update note ${res.status}`);
//     //     }
//     //     // window.location.reload();
//     //     // router.refresh();
//     //   } catch (error) {
//     //     console.log(`Cannot update due to ${error}`);
//     //   }
//     // }

//     console.log(`isStateEqual:\n${isStateEqual()}`);
//     console.log(`OLD NOTES:\n${JSON.stringify(oldNotes)}`);
//     console.log(`NOTES:\n${JSON.stringify(notes)}`);
//   };

//   const onKeyDown = (e) => {
//     if (e.key === "Enter" || e.key === "Escape") {
//       e.target.blur();
//     }
//   };

//   return (
//     <>
//       {notes?.map((note) => (
//         <div
//           key={note._id}
//           className="px-28 py-8 my-3 flex items-center justify-between bg-slate-700 border border-slate-300 text-slate-200 font-semibold"
//         >
//           <textarea
//             className="transition ease-in duration-100 resize-none break-words hover:bg-[#d3d3d3] hover:text-slate-900 focus:text-slate-900 hover:cursor-pointer focus:bg-[#d3d3d3] bg-transparent placeholder-slate-100 placeholder-opacity-30 hover:placeholder-transparent"
//             placeholder="Enter Title"
//             type="text"
//             onFocus={(e) => (e.target.placeholder = "")}
//             value={note.title}
//             onChange={(e) =>
//               setNotes(
//                 notes.map((oNote) => {
//                   if (oNote._id === note._id) {
//                     return { ...oNote, title: e.target.value };
//                   } else {
//                     // No changes
//                     return oNote;
//                   }
//                 })
//               )
//             }
//             onKeyDown={onKeyDown}
//             onBlur={(e) => onNotFocus(e, note._id)}
//           />
//           <DeleteBtn id={note._id} />
//         </div>
//       ))}
//     </>
//   );
// }
