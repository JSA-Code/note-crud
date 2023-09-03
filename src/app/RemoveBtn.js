"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
  const router = useRouter();
  // console.log(`ID IN REMOVE BTN:\n${id}`);

  const handleRemove = async () => {
    const confirmed = confirm("Are you sure you want to delete this note?");
    if (confirmed) {
      const res = await fetch(`/api/notes?id=${id}`, {
        method: "DELETE",
      });
      // PROBLEM WITH router.refresh(), MAY BE DUE TO NESETED CLIENT COMPONENTS
      router.refresh();
      // if (res.ok) {
      //   router.refresh();
      // }
      // console.log(`RES:\n${res}`);
      // console.log(`RES:\n${JSON.stringify(res)}`);
    }
  };
  return (
    <button onClick={handleRemove} className="text-red-500">
      <HiOutlineTrash size={24} />
    </button>
  );
}
