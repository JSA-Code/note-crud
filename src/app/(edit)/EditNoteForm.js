"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditNoteForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (!res.ok) {
        throw new Error(`Failed to update note. Error: ${res.status}`);
      }
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(`Error while updating note, ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-100 px-8 py-2 bg-slate-300 placeholder-slate-900 placeholder-opacity-70 font-medium text-slate-900"
        type="text"
        placeholder="Notes Title"
      />
      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-100 px-8 py-2 bg-slate-300 placeholder-slate-900 placeholder-opacity-70 font-medium text-slate-900"
        type="text"
        placeholder="Notes Description"
      />
      <button
        type="submit"
        className="bg-blue-300 font-bold text-lg text-slate-900 py-3 px-6 w-fit rounded-sm"
      >
        Update Note
      </button>
    </form>
  );
}
