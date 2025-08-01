import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const fetchNotes = async () => {
    const res = await axios.get("https://notesapp-production-5b01.up.railway.app/api/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async () => {
    if (!title || !desc) return;
    await axios.post("https://notesapp-production-5b01.up.railway.app/api/notes", { title, description: desc });
    setTitle("");
    setDesc("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`https://notesapp-production-5b01.up.railway.app/api/notes/${id}`);
    fetchNotes();
  };

  return (
      <div style={{ padding: 20 }}>
        <h1>Notes App</h1>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button onClick={addNote}>Add</button>
        <ul>
          {notes.map((n) => (
              <li key={n.id}>
                <b>{n.title}</b>: {n.description}
                <button onClick={() => deleteNote(n.id)}>Delete</button>
              </li>
          ))}
        </ul>
          {/* Footer */}
          <footer style={{ marginTop: 20, fontSize: "14px", color: "black" }}>
              Made by <b>Darshana Agarwal</b>
          </footer>
      </div>
  );
}

export default App;
