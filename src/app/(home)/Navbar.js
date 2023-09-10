import Link from "next/link";
import AddBtn from "./AddBtn";

export default function Navbar() {
  return (
    <nav className="flex justify-center gap-10 items-center bg-slate-700 px-6 py-3 ">
      <Link href="/" className="font-bold">
        Home
      </Link>
      <Link href="/client" className="font-bold">
        Client
      </Link>
      <Link href="/server" className="font-bold">
        Server
      </Link>
      <AddBtn />
    </nav>
  );
}
