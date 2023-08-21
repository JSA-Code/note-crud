import { Schema, models, model } from "mongoose";

const NoteSchema = new Schema(
  { title: String, description: String },
  { timestamps: true }
);

const Note = models.Note || model("Note", NoteSchema);

export default Note;
