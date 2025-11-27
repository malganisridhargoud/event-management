import React, { useEffect, useState } from "react";
import api from "../api/api";
import EventCard from "../components/EventCard";

export default function MyRegistrations() {
  const [regs, setRegs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/registrations/me/all");
        setRegs(res.data || []);
      } catch (err) {
        // ignore
      }
    })();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Registrations</h2>
      {regs.length === 0 ? <div className="card">No registrations</div> : regs.map(r => <EventCard key={r._id} e={r.event} />)}
    </div>
  );
}
