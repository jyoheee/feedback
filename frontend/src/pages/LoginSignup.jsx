import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";

const LoginSignup = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", username: "", password: "", confirm: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [
      { email: "admin@feedly.com", password: "admin123", role: "admin" },
      { email: "user@feedly.com", password: "user123", role: "user" }
    ];

    if (isLogin) {
      const user = users.find(u => u.email === form.email && u.password === form.password);
      if (user) {
        onLogin(user.role); // admin or user
        navigate("/user"); // redirect after login
      } else {
        alert("Invalid credentials! Try admin@feedly.com/admin123 or user@feedly.com/user123");
      }
    } else {
      if (!form.email || !form.username || !form.password || !form.confirm) {
        return alert("Please fill all fields!");
      }
      if (form.password !== form.confirm) return alert("Passwords do not match!");

      if (users.some(u => u.email === form.email)) {
        return alert("Email already registered!");
      }

      users.push({ email: form.email, password: form.password, role: "user" });
      localStorage.setItem("users", JSON.stringify(users));
      alert(`User ${form.username} registered successfully!`);
      setIsLogin(true);
    }
  };

  return (
    <div className="login-container">
      <div className="form-card">
        <h1 className="site-title">Feedly</h1>
        <div className="toggle-buttons">
          <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>Login</button>
          <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>Signup</button>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              required
            />
          )}
          <button type="submit" className="submit-btn">{isLogin ? "Login" : "Signup"}</button>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;