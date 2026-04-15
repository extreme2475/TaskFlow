import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/v1/auth/register", form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <form style={styles.box} onSubmit={handleSubmit}>
          <h2 style={styles.title}>Join Us</h2>
          <p style={styles.subtitle}>Create your employee account below.</p>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              name="name"
              placeholder="John Doe"
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="john@example.com"
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
              placeholder="Min. 8 characters"
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <button style={styles.button}>Create Account</button>

          <p style={styles.footerText}>
            Already have an account?{" "}
            <span
              style={styles.link}
              onClick={() => navigate("/login")}
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

// Re-using styles from Login for consistency
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
    gap: "18px",
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

export default Register;