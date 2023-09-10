import Link from "next/link";
import AddBtn from "./AddBtn";
import SignInBtn from "./SignInBtn";

export default function Navbar() {
  return (
    <nav className="flex justify-around items-center bg-slate-700 px-6 py-3 ">
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
      <SignInBtn />
    </nav>
  );
}
