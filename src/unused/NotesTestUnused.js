// "use client";

// import { useState } from "react";
// import DeleteBtn from "@/components/DeleteBtn";
// import { useRouter } from "next/navigation";

// export default function NotesTest({ notes }) {
//   // console.log(notes);
//   // const { id, title } = notes;
//   // console.log(notes[0].title);
//   const router = useRouter();
//   const [data, setData] = useState(notes);

//   const onNotFocus = async (e, id) => {
//     e.preventDefault();
//     // console.log(e.target.value);
//     // setData(data);
//     if (!(e.target.value.trim() === "")) {
//       // if (!(e.target.value.trim() === "")) {
//       console.log("INSIDE OF TRY CATCH!");
//       try {
//         const res = await fetch(`/api/notes/${id}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ newTitle: e.target.value }),
//         });

//         if (!res.ok) {
//           throw new Error(`Failed to update note. Error: ${res.status}`);
//         }
//         router.refresh();
//       } catch (error) {
//         console.log(`Error while updating note: ${error}`);
//       }
//     }
//   };
//   // const onNotFocus = async (e) => {
//   //   // alert(isSameTitle);
//   //   e.preventDefault();
//   //   setData(data.map((note) => ({ ...note, title: e.target.value })));
//   //   // if (!(e.target.value.trim() === "") && !(title === data)) {
//   //   try {
//   //     const res = await fetch(`/api/notes/${id}`, {
//   //       method: "PUT",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({ newTitle: data }),
//   //     });

//   //     if (!res.ok) {
//   //       throw new Error(`Failed to update note. Error: ${res.status}`);
//   //     }
//   //     router.refresh();
//   //   } catch (error) {
//   //     console.log(`Error while updating note, ${error}`);
//   //   }
//   //   router.refresh();
//   //   // }
//   // };

//   const onKeyDown = (e) => {
//     // console.log(e);
//     if (e.key === "Enter" || e.key === "Escape") {
//       e.target.blur();
//     }
//   };

//   // return (
//   //   <>
//   //     {data.map((note) => (
//   //       <div
//   //         key={note._id}
//   //         className="px-28 py-8 my-3 flex items-center justify-between bg-slate-700 border border-slate-300 text-slate-200 font-semibold"
//   //       >
//   //         <textarea
//   //           className="resize-none break-words hover:bg-[#d3d3d3] hover:text-slate-900 focus:text-slate-900 hover:cursor-pointer focus:bg-[#d3d3d3] bg-transparent placeholder-slate-100 placeholder-opacity-30 hover:placeholder-transparent"
//   //           placeholder="Enter Title"
//   //           type="text"
//   //           onFocus={(e) => (e.target.placeholder = "")}
//   //           value={note.title}
//   //           onChange={(e) =>
//   //             setData(data.map((a) => ({ ...note, title: e.target.value })))
//   //           }
//   //           onKeyDown={onKeyDown}
//   //           // onBlur={onNotFocus}
//   //         />
//   //         {/* {console.log(note)} */}
//   //         <RemoveBtn id={note._id} />
//   //       </div>
//   //     ))}
//   //   </>
//   // );

//   return (
//     <>
//       {data.map((note, index) => (
//         <div
//           key={note._id}
//           className="px-28 py-8 my-3 flex items-center justify-between bg-slate-700 border border-slate-300 text-slate-200 font-semibold"
//         >
//           {/* {console.log(note)} */}
//           <textarea
//             className="resize-none break-words hover:bg-[#d3d3d3] hover:text-slate-900 focus:text-slate-900 hover:cursor-pointer focus:bg-[#d3d3d3] bg-transparent placeholder-slate-100 placeholder-opacity-30 hover:placeholder-transparent"
//             placeholder="Enter Title"
//             type="text"
//             onFocus={(e) => (e.target.placeholder = "")}
//             value={note.title}
//             onChange={(e) => {
//               // const updatedData = [...data];
//               // updatedData[index] = { ...note, title: e.target.value };
//               data[index] = { ...note, title: e.target.value };
//               setData([...data]);
//             }}
//             onKeyDown={onKeyDown}
//             onBlur={(e) => onNotFocus(e, note._id)}
//           />
//           <DeleteBtn id={note._id} />
//         </div>
//       ))}
//     </>
//   );
// }
