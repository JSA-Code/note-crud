import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-slate-700 px-8 py-3 ">
      <Link href="/" className="font-bold">
        Home
      </Link>
      <Link href="/add" className="bg-slate-100 text-slate-900 font-bold p-2">
        Add Note
      </Link>
    </nav>
  );
}
