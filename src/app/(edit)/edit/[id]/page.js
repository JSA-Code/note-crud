import EditNoteForm from "../../EditNoteForm";

const getNoteById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
      cache: "no-store",
    }); // cache: "no-store" to prevent caching
    if (!res.ok) {
      throw new Error(`Failed to fetch note. Error: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.log(`Error while loading note, ${error}`);
  }
};

export default async function EditNote({ params }) {
  const { id } = params;
  const { note } = await getNoteById(id);
  const { title, description } = note;
  return <EditNoteForm id={id} title={title} description={description} />;
}
