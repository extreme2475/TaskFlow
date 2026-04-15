import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        form
      );

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful");
      window.location.href = user.role === "admin" ? "/admin" : "/dashboard";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <form style={styles.box} onSubmit={handleSubmit}>
          <h2 style={styles.title}>Login</h2>
          <p style={styles.subtitle}>Welcome back! Please enter your details.</p>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="name@company.com"
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <button style={styles.button}>Sign In</button>

          <p style={styles.footerText}>
            Don't have an account?{" "}
            <span
              style={styles.link}
              onClick={() => (window.location.href = "/register")}
            >
              Create one
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

// Shared Styles Object
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  title: {
    margin: "0",
    fontSize: "28px",
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
  },
  subtitle: {
    margin: "-10px 0 10px 0",
    fontSize: "14px",
    color: "#666",
    textAlign: "center",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#444",
  },
  input: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  button: {
    padding: "14px",
    background: "#000",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "10px",
    transition: "background 0.3s",
  },
  footerText: {
    fontSize: "14px",
    color: "#666",
    textAlign: "center",
    marginTop: "10px",
  },
  link: {
    color: "#000",
    fontWeight: "700",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Login;