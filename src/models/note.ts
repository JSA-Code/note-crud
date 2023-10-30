import { Schema, models, model, InferSchemaType } from "mongoose";
import { connectMongoDB } from "@/libs/mongodb";

connectMongoDB();

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true },
);

const NoteModel = models.Note || model("Note", noteSchema);

export type Note = InferSchemaType<typeof noteSchema>;
export default NoteModel;
