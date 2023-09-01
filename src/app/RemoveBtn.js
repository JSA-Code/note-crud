"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
  const router = useRouter();

  const handleRemove = async () => {
    const confirmed = confirm("Are you sure you want to delete this note?");
    if (confirmed) {
      const res = await fetch(`/api/notes?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    }
  };
  return (
    <button onClick={handleRemove} className="text-red-500">
      <HiOutlineTrash size={24} />
    </button>
  );
}
