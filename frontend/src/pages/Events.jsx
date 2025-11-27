import React, { useEffect, useState } from "react";
import api from "../api/api";
import EventCard from "../components/EventCard";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    try {
      const res = await api.get("/events");
      setEvents(res.data || []);
    } catch (err) {
      // ignore
    }
  }

  const filtered = events.filter(e => e.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search events" className="p-2 border rounded flex-1" />
      </div>

      {filtered.length === 0 ? <div className="card">No events found</div> : filtered.map(e => <EventCard key={e._id} e={e} />)}
    </div>
  );
}
