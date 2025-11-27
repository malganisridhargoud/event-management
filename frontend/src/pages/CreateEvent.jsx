import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { pushToast } from "../components/Toast";

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: "", description: "", date: "", time: "", location: "", capacity: 0
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append("image", file);

      await api.post("/events", fd, { headers: { "Content-Type": "multipart/form-data" }});
      pushToast("Event created — awaiting approval");
      navigate("/my-events");
    } catch (err) {
      pushToast(err.response?.data?.message || "Create failed", "error");
    }
  };

  return (
    <div className="card max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create Event</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Title" required className="w-full p-2 border rounded" />
        <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Description" className="w-full p-2 border rounded" />
        <div className="grid grid-cols-2 gap-3">
          <input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} required className="p-2 border rounded" />
          <input type="time" value={form.time} onChange={e=>setForm({...form, time:e.target.value})} className="p-2 border rounded" />
        </div>
        <input value={form.location} onChange={e=>setForm({...form, location:e.target.value})} placeholder="Location" className="w-full p-2 border rounded" />
        <input type="number" value={form.capacity} onChange={e=>setForm({...form, capacity: Number(e.target.value)})} placeholder="Capacity" className="w-full p-2 border rounded" />
        <div>
          <label className="text-sm text-slate-600">Event image (optional)</label>
          <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} className="block mt-2" />
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Create</button>
      </form>
    </div>
  );
}
