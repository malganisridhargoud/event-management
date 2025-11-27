import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import api from "../../api/api";
import { pushToast } from "../../components/Toast";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    try {
      const res = await api.get("/admin/pending-events");
      setEvents(res.data || []);
    } catch (err) {}
  }

  const approve = async (id) => {
    try {
      await api.put(`/events/${id}/approve`);
      pushToast("Event approved");
      fetch();
    } catch (err) {
      pushToast("Approve failed", "error");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
      <div className="lg:col-span-1"><AdminSidebar /></div>
      <div className="lg:col-span-5">
        <div className="card">
          <h2 className="text-2xl font-semibold">Pending Events</h2>
          <div className="mt-4 space-y-3">
            {events.length === 0 ? <div className="card">No pending events</div> :
              events.map(ev => (
                <div className="card flex justify-between items-center" key={ev._id}>
                  <div>
                    <div className="font-semibold">{ev.title}</div>
                    <div className="text-sm text-slate-500">{ev.location} • {new Date(ev.date).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <button onClick={() => approve(ev._id)} className="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
