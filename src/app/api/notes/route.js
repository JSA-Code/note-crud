import { connectMongoDB } from "@/libs/mongodb";
import Note from "@/models/note";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

await connectMongoDB();
// const session = await getServerSession(authOptions);

export async function GET() {
  const session = await getServerSession(authOptions);

  // console.log(`SESSION IN GET()\n${JSON.stringify(session)}`);

  if (!session) {
    return NextResponse.json({
      status: "fail",
      message: "You are not logged in",
      status: 401,
    });
  }

  const notes = await Note.find({ email: session.user.email });
  return NextResponse.json({ notes });
}

export async function POST(request) {
  // const session = await getServerSession(authOptions);

  // console.log(`SESSION IN POST()\n${JSON.stringify(session)}`);

  // if (!session) {
  //   return NextResponse.json({
  //     status: "fail",
  //     message: "You are not logged in",
  //     status: 401,
  //   });
  // }

  const { title, email } = await request.json();
  await Note.create({ title, email });
  return NextResponse.json({ message: "NOTE CREATED!" }, { status: 201 });
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions);

  // console.log(`SESSION IN DELETE()\n${JSON.stringify(session)}`);

  if (!session) {
    return NextResponse.json({
      status: "fail",
      message: "You are not logged in",
      status: 401,
    });
  }

  const id = request.nextUrl.searchParams.get("id");
  await Note.findByIdAndDelete(id);
  return NextResponse.json({ message: "NOTE DELETED!" }, { status: 200 });
}

export async function PUT(request) {
  // const session = await getServerSession(authOptions);
  // console.log(`SESSION IN PUT()\n${JSON.stringify(session)}`);
  // console.log(`REQ JSON\n${JSON.stringify(await request.json())}`);

  // if (!session) {
  //   return NextResponse.json({
  //     status: "fail",
  //     message: "You are not logged in",
  //     status: 401,
  //   });
  // }

  const { id, newTitle: title } = await request.json();
  await Note.findByIdAndUpdate(id, { title });
  console.log("PUT REQ ROUTE.JS");
  return NextResponse.json({ message: "NOTE UPDATED!" }, { status: 200 });
}
