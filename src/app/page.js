import Editable from "./Editable";

const getNotes = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/notes", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch notes. Error: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.log(`Error while loading notes, ${error}`);
  }
};

export default async function Home() {
  const { notes } = await getNotes();
  return <Editable notes={notes} />;
}
