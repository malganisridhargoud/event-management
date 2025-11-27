import React, { useEffect, useState } from "react";
import api from "../api/api";
import EventCard from "../components/EventCard";

export default function MyEvents() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const res = await api.get(`/events/user/${user.id}`);
        setEvents(res.data || []);
      } catch (err) {
        // ignore
      }
    })();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Events</h2>
      {events.length === 0 ? <div className="card">You haven't created any events.</div> : events.map(ev => <EventCard key={ev._id} e={ev} showControls />)}
    </div>
  );
}
