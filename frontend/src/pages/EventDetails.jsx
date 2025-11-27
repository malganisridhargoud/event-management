import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { pushToast } from "../components/Toast";

export default function EventDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const [event, setEvent] = useState(null);
  const [booked, setBooked] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/events/details/${id}`);
        setEvent(res.data);
      } catch (err) {
        pushToast("Could not fetch event", "error");
      }
    })();
  }, [id]);

  const register = async () => {
    if (!user) {
      pushToast("Login to register", "error");
      nav("/login");
      return;
    }
    try {
      await api.post(`/registrations/${id}/register`);
      pushToast("Registered");
      setBooked(true);
    } catch (err) {
      pushToast(err.response?.data?.message || "Registration failed", "error");
    }
  };

  if (!event) return <div className="card">Loading...</div>;

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 card">
        <h1 className="text-2xl font-bold">{event.title}</h1>
        <div className="text-sm text-slate-500">{new Date(event.date).toLocaleString()} • {event.location}</div>

        {event.image && <img src={event.image} alt={event.title} className="w-full h-64 object-cover mt-4 rounded" />}

        <p className="mt-4 text-slate-700">{event.description}</p>

        <div className="mt-4 flex gap-2">
          {user?.role === "user" && (
            <button onClick={register} className="px-4 py-2 bg-indigo-600 text-white rounded" disabled={booked}>
              {booked ? "Registered" : "Register"}
            </button>
          )}

          {user && (String(user.id) === String(event.createdBy?._id) || user.role === "admin") && (
            <>
              <button onClick={() => nav(`/events/edit/${event._id}`)} className="px-3 py-1 border rounded">Edit</button>
            </>
          )}
        </div>
      </div>

      <aside className="card">
        <h3 className="font-semibold">Details</h3>
        <ul className="mt-3 text-sm space-y-2">
          <li><strong>Capacity:</strong> {event.capacity || "Unlimited"}</li>
          <li><strong>Organizer:</strong> {event.createdBy?.name || "Unknown"}</li>
          <li><strong>Status:</strong> {event.approved ? "Approved" : "Pending"}</li>
        </ul>
      </aside>
    </div>
  );
}
