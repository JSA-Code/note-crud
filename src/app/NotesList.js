import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

// export noteslist component
export default function NotesList() {
  return (
    <>
      <div>
        <div>
          <h2>Notes Title</h2>
          <div>Notes Description</div>
        </div>

        <div>
          <RemoveBtn />
          <Link href="/edit/123">
            <HiPencilAlt size={24} />
          </Link>
        </div>
      </div>
    </>
  );
}
