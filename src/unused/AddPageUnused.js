// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AddNote() {
//   const [title, setTitle] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title) {
//       alert("Title cannot be empty");
//       return;
//     }

//     try {
//       const res = await fetch("/api/notes", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ title }),
//       });

//       if (res.ok) {
//         router.refresh();
//         router.push("/");
//       } else {
//         throw new Error(`Failed to create note. Error: ${res.status}`);
//       }
//     } catch (error) {
//       console.log(`Error while creating note, ${error}`);
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//       <input
//         onChange={(e) => setTitle(e.target.value)}
//         value={title}
//         className="border border-slate-100 px-8 py-2 bg-slate-300 placeholder-slate-900 placeholder-opacity-70 font-medium text-slate-900"
//         type="text"
//         placeholder="Notes Title"
//       />
//       <button
//         type="submit"
//         className="bg-blue-300 font-bold text-lg text-slate-900 py-3 px-6 w-fit rounded-sm"
//       >
//         Add Note
//       </button>
//     </form>
//   );
// }
