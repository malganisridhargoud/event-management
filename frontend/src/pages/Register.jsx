import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { pushToast } from "../components/Toast";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      pushToast("Registered. Login now.");
      navigate("/login");
    } catch (err) {
      pushToast(err.response?.data?.message || "Register failed", "error");
    }
  };

  return (
    <div className="card max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" required className="w-full p-2 border rounded" />
        <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" type="email" required className="w-full p-2 border rounded" />
        <input value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" type="password" required className="w-full p-2 border rounded" />
        <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="w-full p-2 border rounded">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="w-full py-2 bg-indigo-600 text-white rounded">Register</button>
      </form>
    </div>
  );
}
