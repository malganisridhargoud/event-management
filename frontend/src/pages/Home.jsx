import React, { useEffect, useState } from "react";
import api from "../api/api";
import EventCard from "../components/EventCard";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [upcoming, setUpcoming] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const up = await api.get("/events/upcoming");
        setUpcoming(up.data || []);

        // featured: top 3 approved events (quick approach)
        const res = await api.get("/events?"); // will return approved + own
        const approved = res.data.filter(e => e.approved);
        setFeatured(approved.slice(0, 3));

        // admin analytics if admin
        if (user?.role === "admin") {
          const a = await api.get("/admin/analytics");
          setStats(a.data);
        }
      } catch (err) {
        // ignore
      }
    })();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="card mb-6">
          <h1 className="text-3xl font-bold">Discover events near you</h1>
          <p className="mt-2 text-slate-600">Browse upcoming events, create your own and manage registrations.</p>
          <div className="mt-4 flex gap-2">
            <a href="/events" className="btn" style={{ background: "var(--brand)" }}>Browse Events</a>
            {user?.role === "user" && <a href="/create" className="btn bg-green-600">Create Event</a>}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Featured</h2>
          {featured.length === 0 ? <div className="card">No featured events</div> : featured.map(e => <EventCard key={e._id} e={e} />)}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Upcoming in next 30 days</h2>
          {upcoming.length === 0 ? <div className="card">No upcoming events</div> : upcoming.map(e => <EventCard key={e._id} e={e} />)}
        </div>
      </div>

      <aside>
        <div className="card mb-4">
          <h3 className="font-semibold">Why EventMgmt?</h3>
          <p className="text-sm text-slate-600 mt-2">Simple, reliable, secure event management for small teams.</p>
        </div>

        {user?.role === "admin" && stats && (
          <div className="card">
            <h3 className="font-semibold">Admin Stats</h3>
            <ul className="mt-3 text-sm space-y-2">
              <li>Total users: {stats.total_users}</li>
              <li>Total events: {stats.total_events}</li>
              <li>Approved: {stats.approved_events}</li>
              <li>Pending: {stats.pending_events}</li>
              <li>Registrations: {stats.total_registrations}</li>
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}
