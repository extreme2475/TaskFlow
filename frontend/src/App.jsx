import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// 🧠 safe localStorage parsing
const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
};

function App() {
  const user = getUser();

  return (
    <BrowserRouter>
      <Routes>

        {/* 🔐 default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* 🔓 AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 👤 USER DASHBOARD (PROTECTED) */}
        <Route
          path="/dashboard"
          element={
            user && user.role === "user" ? (
              <UserDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 👨‍💼 ADMIN DASHBOARD (PROTECTED) */}
        <Route
          path="/admin"
          element={
            user && user.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ❌ fallback route */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;