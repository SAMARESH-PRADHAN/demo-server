import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createNote, getNotes, updateNote, deleteNote } from "../api";
export default function Success() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes(user.id).then(setNotes);
  }, []);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    const newNote = await createNote({
      userId: user.id,
      content: text,
    });

    setNotes([newNote, ...notes]);
    setText("");
  };

  const handleEdit = async (id, oldText) => {
    const newText = prompt("Edit text:", oldText);
    if (!newText) return;

    const updated = await updateNote(id, newText);
    setNotes(notes.map((n) => (n.id === id ? updated : n)));
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="auth-container">
      <div>
        <h1>🎉 Login Successful</h1>
        <p>Welcome to the application</p>

        <button className="danger" onClick={() => navigate("/")}>
          Logout
        </button>
      </div>
      <div style={{ maxWidth: 500, margin: "auto" }}>
        <h2>Welcome, {user.email}</h2>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
          style={{ width: "100%", padding: 10 }}
        />

        <button onClick={handleSubmit} style={{ marginTop: 10 }}>
          Submit
        </button>

        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              {note.content}
              <button onClick={() => handleEdit(note.id, note.content)}>
                ✏️
              </button>
              <button onClick={() => handleDelete(note.id)}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
