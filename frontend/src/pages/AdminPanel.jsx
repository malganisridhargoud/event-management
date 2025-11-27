import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminPanel(){
  const [events, setEvents] = useState([]);

  const fetch = async () => {
    const res = await api.get("/events?approved=false");
    setEvents(res.data);
  };

  useEffect(()=> { fetch(); }, []);

  const approve = async (id) => {
    await api.put(`/events/${id}/approve`);
    fetch();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Admin — Pending Events</h2>
      {events.map(e => (
        <div key={e._id} className="card mb-3 flex justify-between">
          <div>
            <h3 className="font-semibold">{e.title}</h3>
            <p className="text-sm text-slate-600">{new Date(e.date).toLocaleDateString()}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>approve(e._id)} className="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
          </div>
        </div>
      ))}
    </div>
  );
}
