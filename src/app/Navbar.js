import Link from "next/link";
import AddBtn from "./AddBtn";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-slate-700 px-6 py-3 ">
      <Link href="/" className="font-bold">
        Home
      </Link>
      <AddBtn />
    </nav>
  );
}
