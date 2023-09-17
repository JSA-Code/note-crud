import SignUpBtn from "@/components/SignUpBtn";
import { HiUser } from "react-icons/hi";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  return (
    <>
      <div>
        <h2 className="mt-14 text-center text-lg font-semibold">
          Please press on the links above to view server and client pages
        </h2>
      </div>

      <div className="flex min-h-full flex-col justify-center bg-slate-300 px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <HiUser className="mx-auto w-auto text-black" size={80} />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {!session && <SignUpBtn />}
        </div>
      </div>
    </>
  );
}
