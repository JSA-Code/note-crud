"use client";

import { HiOutlineTrash } from "react-icons/hi";

export default function RemoveBtn({ id }) {
  const handleRemove = async () => {
    const confirmed = confirm("Are you sure you want to delete this note?");
    if (confirmed) {
      const res = await fetch(`/api/notes?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        window.location.reload();
      }
    }
  };
  return (
    <button onClick={handleRemove} className="text-red-500">
      <HiOutlineTrash size={24} />
    </button>
  );
}
