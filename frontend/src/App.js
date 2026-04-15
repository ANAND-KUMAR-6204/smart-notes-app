import { useState } from "react";
import axios from "axios";

const API = "https://smart-notes-app-ig25.onrender.com";

function App() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const register = async () => {
    try {
      await axios.post(`${API}/api/v1/auth/register`, {
        name: "User",
        email,
        password
      });
      setMessage("Registered successfully");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Registration failed");
    }
  };

  const login = async () => {
    try {
      const res = await axios.post(`${API}/api/v1/auth/login`, {
        email,
        password
      });

      const payload = JSON.parse(atob(res.data.token.split(".")[1]));

      setToken(res.data.token);
      setIsAdmin(payload.role === "admin");

      setMessage("Login successful");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Login failed");
    }
  };

  const addNote = async () => {
    try {
      await axios.post(
        `${API}/api/v1/notes`,
        { title, content: "demo", tags: ["tag"] },
        { headers: { authorization: token } }
      );
      setMessage("Note added");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Failed to add note");
    }
  };

  const getNotes = async () => {
    try {
      const res = await axios.get(`${API}/api/v1/notes`, {
        headers: { authorization: token }
      });
      setNotes(res.data);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Failed to load notes");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        Smart Notes App
      </h2>

      <input
        placeholder="Email"
        style={inputStyle}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        style={inputStyle}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button style={buttonStyle} onClick={register}>Register</button>
      <button style={buttonStyle} onClick={login}>Login</button>

      <input
        placeholder="Note title"
        style={inputStyle}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button style={buttonStyle} onClick={addNote}>Add Note</button>
      <button style={buttonStyle} onClick={getNotes}>Load Notes</button>

      <p style={{ textAlign: "center", color: "#555" }}>{message}</p>

      {isAdmin && (
        <div style={adminStyle}>
          <h4>Admin Panel</h4>
          <p>You are logged in as admin</p>
        </div>
      )}

      <div>
        {notes.map((n) => (
          <div key={n._id} style={noteStyle}>
            {n.title}
          </div>
        ))}
      </div>
    </div>
  );
}

const containerStyle = {
  maxWidth: "420px",
  margin: "60px auto",
  padding: "25px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  fontFamily: "Segoe UI"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px"
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "8px",
  backgroundColor: "#333",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const adminStyle = {
  marginTop: 15,
  padding: 10,
  border: "1px solid #333",
  borderRadius: "5px",
  backgroundColor: "#f1f1f1"
};

const noteStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  marginTop: "8px",
  borderRadius: "5px",
  backgroundColor: "#f9f9f9"
};

export default App;