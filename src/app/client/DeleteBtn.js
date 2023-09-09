"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { deleteAction } from "@/libs/actions";

export default function DeleteBtn({ id }) {
  const handleRemove = async () => {
    const confirmed = confirm("Are you sure you want to delete this note?");

    if (confirmed) {
      const checkRes = await deleteAction(id);

      if (checkRes) {
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
