import Note from "@/models/note";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

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

  console.log("GET REQ ROUTE.JS");
  const notes = await Note.find({ email: session.user.email });
  return NextResponse.json({ notes });
}

export async function POST(request) {
  const { title, email } = await request.json();
  // const session = await getServerSession(authOptions);

  // console.log(`SESSION IN POST()\n${JSON.stringify(session)}`);

  // if (!session) {
  //   return NextResponse.json({
  //     message: "You are not logged in",
  //   }, { status: 401 });
  // }

  console.log("POST REQ ROUTE.JS");

  // const notes = await Note.find({ email: session.user.email });

  // get count  of notes from database with email of user
  const notes = await Note.find({ email }).countDocuments();
  // console.log(`NOTES COUNT\n${notes}`);
  // console.log(`IS NOTES > 10\n${notes > 10}`);
  // console.log(`email\n${JSON.stringify({ email })}`);

  if (notes > 10) {
    return NextResponse.json(
      {
        message: "You have reached the maximum number of notes",
      },
      { status: 401 }
    );
  }

  await Note.create({ title, email });
  return NextResponse.json({ message: "NOTE CREATED!" }, { status: 200 });
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions);

  // console.log(`SESSION IN DELETE()\n${JSON.stringify(session)}`);

  if (!session) {
    return NextResponse.json(
      {
        message: "You are not logged in",
      },
      { status: 401 }
    );
  }

  console.log("DELETE REQ ROUTE.JS");
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
