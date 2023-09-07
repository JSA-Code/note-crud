import { connectMongoDB } from "@/libs/mongodb";
import Note from "@/models/note";
import { NextResponse } from "next/server";

connectMongoDB();

export async function GET() {
  const notes = await Note.find({});
  return NextResponse.json({ notes });
}

export async function POST(request) {
  const { title } = await request.json();
  await Note.create({ title });
  return NextResponse.json({ message: "NOTE CREATED!" }, { status: 201 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await Note.findByIdAndDelete(id);
  return NextResponse.json({ message: "NOTE DELETED!" }, { status: 200 });
}
