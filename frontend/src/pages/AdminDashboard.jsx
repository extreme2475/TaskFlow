import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [view, setView] = useState("my"); // my | employees | userTasks
  const [form, setForm] = useState({ title: "", description: "" });

  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user"));

  // 👥 USERS (exclude admin)
  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/v1/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const employees = res.data.users.filter((u) => u.role !== "admin");
    setUsers(employees);
  };

  // 👤 MY TASKS
  const fetchMyTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/v1/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
    setView("my");
    setSelectedUser(null);
  };

  // 👥 SHOW EMPLOYEES
  const showEmployees = () => {
    setView("employees");
    setTasks([]);
    setSelectedUser(null);
  };

  // 👤 USER TASKS
  const fetchUserTasks = async (userId) => {
    const res = await axios.get(
      `http://localhost:5000/api/v1/admin/tasks/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTasks(res.data.tasks);
    setView("userTasks");
  };

  // ➕ CREATE TASK
  const createTask = async (e) => {
    e.preventDefault();
    const userId =
      view === "userTasks"
        ? selectedUser._id
        : currentUser._id || currentUser.id;

    await axios.post(
      "http://localhost:5000/api/v1/tasks",
      { title: form.title, description: form.description, userId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setForm({ title: "", description: "" });
    if (view === "userTasks") {
      fetchUserTasks(selectedUser._id);
    } else {
      fetchMyTasks();
    }
  };

  // 🗑 DELETE
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/v1/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (view === "userTasks") {
      fetchUserTasks(selectedUser._id);
    } else {
      fetchMyTasks();
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchUsers();
    fetchMyTasks();
  }, []);

  // --- STYLES ---
  const styles = {
    container: { display: "flex", height: "100vh", fontFamily: "'Segoe UI', Roboto, sans-serif", backgroundColor: "#f8f9fa" },
    sidebar: { width: "280px", backgroundColor: "#ffffff", borderRight: "1px solid #e0e0e0", padding: "20px", display: "flex", flexDirection: "column" },
    mainContent: { flex: 1, padding: "40px", overflowY: "auto" },
    navButton: (active) => ({
      padding: "12px 15px",
      marginBottom: "8px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: active ? "#eef2ff" : "transparent",
      color: active ? "#4f46e5" : "#4b5563",
      textAlign: "left",
      cursor: "pointer",
      fontWeight: active ? "600" : "500",
      transition: "0.2s"
    }),
    card: { backgroundColor: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", marginBottom: "15px", border: "1px solid #f0f0f0" },
    input: { padding: "10px 15px", borderRadius: "8px", border: "1px solid #ddd", marginRight: "10px", width: "200px" },
    actionBtn: { padding: "10px 20px", backgroundColor: "#4f46e5", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
    deleteBtn: { color: "#dc2626", background: "none", border: "none", cursor: "pointer", fontWeight: "500", marginTop: "10px", padding: "0" },
    userItem: (active) => ({
      padding: "10px 15px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      backgroundColor: active ? "#f3f4f6" : "transparent",
      borderLeft: active ? "4px solid #4f46e5" : "4px solid transparent",
      marginBottom: "5px"
    })
  };

  return (
    <div style={styles.container}>
      {/* LEFT SIDEBAR */}
      <div style={styles.sidebar}>
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ margin: 0, fontSize: "1.2rem", color: "#111827" }}>{currentUser?.name}</h3>
          <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: "bold", textTransform: "uppercase" }}>Administrator</span>
        </div>

        <button style={styles.navButton(view === "my")} onClick={fetchMyTasks}>
          🏠 My Tasks
        </button>
        <button style={styles.navButton(view === "employees" || view === "userTasks")} onClick={showEmployees}>
          👥 Employee Tasks
        </button>

        {view === "employees" || view === "userTasks" ? (
          <div style={{ marginTop: "20px" }}>
            <h4 style={{ fontSize: "12px", color: "#9ca3af", textTransform: "uppercase", marginBottom: "10px" }}>Employees List</h4>
            {users.map((u) => (
              <div
                key={u._id}
                onClick={() => {
                  setSelectedUser(u);
                  fetchUserTasks(u._id);
                }}
                style={styles.userItem(selectedUser?._id === u._id)}
              >
                {u.name}
              </div>
            ))}
          </div>
        ) : null}

        <button
          onClick={logout}
          style={{ ...styles.navButton(false), marginTop: "auto", color: "#dc2626", border: "1px solid #fee2e2" }}
        >
          Logout
        </button>
      </div>

      {/* RIGHT MAIN CONTENT */}
      <div style={styles.mainContent}>
        <header style={{ marginBottom: "30px" }}>
          <h2 style={{ margin: 0, color: "#1f2937" }}>
            {view === "my"
              ? "My Personal Tasks"
              : view === "employees"
              ? "Select an employee to view tasks"
              : `${selectedUser?.name}'s Tasks`}
          </h2>
        </header>

        {/* CREATE TASK FORM */}
        {(view === "my" || view === "userTasks") && (
          <div style={{ ...styles.card, marginBottom: "40px" }}>
            <h4 style={{ marginTop: 0 }}>Create New Task</h4>
            <form onSubmit={createTask} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <input
                placeholder="Task Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                style={styles.input}
                required
              />
              <input
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                style={{ ...styles.input, width: "300px" }}
              />
              <button style={styles.actionBtn}>Add Task</button>
            </form>
          </div>
        )}

        {/* TASK LIST */}
        <div style={{ display: "grid", gap: "15px" }}>
          {tasks.length === 0 && view !== "employees" && (
            <p style={{ color: "#9ca3af" }}>No tasks found.</p>
          )}
          {tasks.map((t) => (
            <div key={t._id} style={styles.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h4 style={{ margin: "0 0 8px 0", color: "#111827" }}>{t.title}</h4>
                  <p style={{ margin: 0, color: "#4b5563", fontSize: "14px" }}>{t.description}</p>
                </div>
                <button onClick={() => deleteTask(t._id)} style={styles.deleteBtn}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;