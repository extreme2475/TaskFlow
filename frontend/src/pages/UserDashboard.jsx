import { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // 📥 Get tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ➕ Create task
  const createTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/v1/tasks",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setForm({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // 🗑️ Delete task
  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("Delete this task?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/v1/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        
        {/* HEADER */}
        <header style={styles.header}>
          <div>
            <h2 style={styles.welcomeText}>Welcome, {user?.name}</h2>
            <span style={styles.badge}>User Account</span>
          </div>
          <button onClick={logout} style={styles.logoutBtn}>
            Logout
          </button>
        </header>

        {/* ➕ CREATE TASK SECTION */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Create New Task</h3>
          <form onSubmit={createTask} style={styles.form}>
            <input
              placeholder="Task Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              style={styles.input}
              required
            />
            <input
              placeholder="Brief Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={styles.input}
            />
            <button style={styles.button}>Add Task</button>
          </form>
        </section>

        {/* 📋 TASKS LIST */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>My Tasks ({tasks.length})</h3>
          <div style={styles.list}>
            {tasks.length === 0 ? (
              <p style={styles.emptyMsg}>No tasks assigned yet. Start by adding one above!</p>
            ) : (
              tasks.map((task) => (
                <div key={task._id} style={styles.card}>
                  <div style={styles.cardContent}>
                    <h4 style={styles.taskTitle}>{task.title}</h4>
                    <p style={styles.taskDesc}>{task.description}</p>
                  </div>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

// --- STYLES ---
const styles = {
  page: {
    backgroundColor: "#f4f7f6",
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  container: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    padding: "0 10px",
  },
  welcomeText: {
    margin: 0,
    fontSize: "24px",
    color: "#2d3436",
  },
  badge: {
    fontSize: "12px",
    color: "#636e72",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  logoutBtn: {
    background: "#ff7675",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.2s",
  },
  section: {
    background: "white",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    marginBottom: "20px",
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: "16px",
    fontSize: "18px",
    color: "#2d3436",
  },
  form: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    minWidth: "200px",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #dfe6e9",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    padding: "10px 20px",
    background: "#00b894",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #f1f2f6",
    backgroundColor: "#fff",
    transition: "transform 0.2s",
  },
  cardContent: {
    flex: 1,
  },
  taskTitle: {
    margin: "0 0 4px 0",
    fontSize: "16px",
    color: "#2d3436",
  },
  taskDesc: {
    margin: 0,
    fontSize: "14px",
    color: "#636e72",
  },
  deleteBtn: {
    background: "#ffeaa7",
    color: "#d63031",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
    marginLeft: "15px",
  },
  emptyMsg: {
    textAlign: "center",
    color: "#b2bec3",
    padding: "20px",
  }
};

export default UserDashboard;