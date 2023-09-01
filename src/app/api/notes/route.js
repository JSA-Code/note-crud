import { connectMongoDB } from "@/libs/mongodb";
import Note from "@/models/note";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const notes = await Note.find({});
  return NextResponse.json({ notes });
}

export async function POST(request) {
  const { title } = await request.json();
  await connectMongoDB();
  await Note.create({ title });
  return NextResponse.json({ message: "NOTE CREATED!" }, { status: 201 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Note.findByIdAndDelete(id);
  return NextResponse.json({ message: "NOTE DELETED!" });
}
