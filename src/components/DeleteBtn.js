"use client";

import { HiOutlineTrash } from "react-icons/hi";
// import { deleteAction } from "@/libs/actions";

export default function DeleteBtn({ id }) {
  const handleRemove = async () => {
    const confirmed = confirm("Are you sure you want to delete this note?");

    if (confirmed) {
      try {
        const res = await fetch(`/api/notes?id=${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          window.location.reload();
        }
      } catch (error) {
        console.log(`Cannot update due to ${error}`);
      }
    }
  };
  return (
    <button onClick={handleRemove} className="text-red-500">
      <HiOutlineTrash size={24} />
    </button>
  );
}
