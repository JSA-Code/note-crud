import Skeleton from "@/components/Skeleton";
import Notes from "./Notes";
import { Suspense } from "react";

export default async function HomeServer() {
  return (
    <div className="flex flex-col items-center gap-x-10 border pt-5 sm:flex-row sm:justify-center">
      <p className="text-center font-bold md:text-left">
        Here we are performing server-side data fetching.
      </p>
      <Suspense fallback={<Skeleton />}>
        <Notes />
      </Suspense>
    </div>
  );
}
