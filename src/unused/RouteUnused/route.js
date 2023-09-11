// import { connectMongoDB } from "@/libs/mongodb";
// import Note from "@/models/note";
// import { NextResponse } from "next/server";

// connectMongoDB();

// export async function GET(request, { params }) {
//   const { id } = params;
//   const note = await Note.findById(id);
//   return NextResponse.json({ note }, { status: 200 });
// }

// export async function PUT(request, { params }) {
//   const { id } = params;
//   const { newTitle: title } = await request.json();
//   await Note.findByIdAndUpdate(id, { title });
//   console.log("PUT REQ ROUTE.JS");
//   return NextResponse.json({ message: "NOTE UPDATED!" }, { status: 200 });
// }
