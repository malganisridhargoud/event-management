import React, { useState } from "react";
import api, { setAuthToken } from "../api/api";
import { useNavigate } from "react-router-dom";
import { pushToast } from "../components/Toast";

export default function Login() {
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = role === "admin" ? "/auth/login-admin" : "/auth/login-user";
      const res = await api.post(endpoint, form);
      const { token, user } = res.data;

      setAuthToken(token);
      localStorage.setItem("user", JSON.stringify(user));
      pushToast("Logged in");

      if (user.role === "admin") navigate("/admin");
      else navigate("/");
    } catch (err) {
      pushToast(err.response?.data?.message || "Login failed", "error");
    }
  };

  return (
    <div className="card max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Login</h2>

      <div className="mb-4 flex gap-2">
        <button onClick={() => setRole("user")} className={`px-3 py-1 rounded ${role === "user" ? "bg-indigo-600 text-white" : "bg-slate-100"}`}>User</button>
        <button onClick={() => setRole("admin")} className={`px-3 py-1 rounded ${role === "admin" ? "bg-red-600 text-white" : "bg-slate-100"}`}>Admin</button>
      </div>

      <form onSubmit={submit} className="space-y-3">
        <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" required className="w-full p-2 border rounded" />
        <input value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" type="password" required className="w-full p-2 border rounded" />
        <button className="w-full py-2 bg-indigo-600 text-white rounded">Login</button>
      </form>
    </div>
  );
}
