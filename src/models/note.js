import { Schema, models, model } from "mongoose";
import { connectMongoDB } from "@/libs/mongodb";

await connectMongoDB();

const NoteSchema = new Schema(
  {
    title: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const Note = models.Note || model("Note", NoteSchema);

export default Note;
