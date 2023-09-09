"use server";

const baseURL = process.env.BASE_URL;

export async function postAction(title) {
  // console.log(`SERVER POST ACTION WITH TITLE: ${title}`);

  const res = await fetch(`${baseURL}/api/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  return res.ok;
}

export async function deleteAction(id) {
  // console.log(`SERVER DELETE ACTION WITH ID: ${id}`);

  const res = await fetch(`${baseURL}/api/notes?id=${id}`, {
    method: "DELETE",
  });

  return res.ok;
}

export async function putAction(id, value) {
  // console.log(`SERVER PUT ACTION WITH ID / INPUT VALUE: ${id}, ${value}`);

  const res = await fetch(`${baseURL}/api/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newTitle: value }),
  });

  return res.ok;
}
