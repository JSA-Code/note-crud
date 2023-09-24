export default function Skeleton() {
  return (
    <ul className="flex w-full max-w-xs flex-col gap-10">
      {[...Array(4)].map((_, index) => (
        <li key={index} className="animate-pulse">
          <p className="mt-2 h-4 w-1/2 rounded-lg bg-slate-600" />
          <p className="mt-2 h-4 rounded-lg bg-slate-600 text-sm font-medium" />
          <p className="mt-2 h-4 rounded-lg bg-slate-600 text-sm font-medium" />
        </li>
      ))}
    </ul>
  );
}

//<ul className="grid grid-flow-row gap-x-4 gap-y-8"
//<ul className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">

// <ul className="flex">
//       <li className="relative w-full max-w-xs animate-pulse">
//         <div className="aspect-square h-[300] w-10 overflow-hidden rounded-lg bg-slate-300" />
//         <p className="mt-2 h-4 w-1/2 rounded-lg bg-slate-600" />
//       </li>
//     </ul>
