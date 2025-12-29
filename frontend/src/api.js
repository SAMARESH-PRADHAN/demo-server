const API = "https://api-demo-server-eaks.onrender.com/api/auth";

export const signupApi = (data) =>
  fetch(`${API}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const loginApi = (data) =>
  fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());

const NOTE_API = "https://api-demo-server-eaks.onrender.com/api/notes";

export const createNote = (data) =>
  fetch(NOTE_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const getNotes = (userId) =>
  fetch(`${NOTE_API}/${userId}`).then((res) => res.json());

export const updateNote = (id, content) =>
  fetch(`${NOTE_API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  }).then((res) => res.json());

export const deleteNote = (id) =>
  fetch(`${NOTE_API}/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
