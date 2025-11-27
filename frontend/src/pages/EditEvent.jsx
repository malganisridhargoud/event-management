import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { pushToast } from "../components/Toast";

export default function EditEvent() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", description: "", date: "", time: "", location: "", capacity: 0 });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/events/details/${id}`);
        setForm({
          title: res.data.title || "",
          description: res.data.description || "",
          date: res.data.date ? new Date(res.data.date).toISOString().slice(0,10) : "",
          time: res.data.time || "",
          location: res.data.location || "",
          capacity: res.data.capacity || 0
        });
      } catch (err) {
        pushToast("Unable to load event", "error");
      }
    })();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append("image", file);

      await api.put(`/events/${id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      pushToast("Event updated");
      navigate("/my-events");
    } catch (err) {
      pushToast(err.response?.data?.message || "Update failed", "error");
    }
  };

  return (
    <div className="card max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Edit Event</h2>
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
          <label className="text-sm text-slate-600">Replace image (optional)</label>
          <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} className="block mt-2" />
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Update</button>
      </form>
    </div>
  );
}
