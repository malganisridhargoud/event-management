import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import api from "../../api/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/admin/analytics");
        setStats(res.data);
      } catch (err) {}
    })();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
      <div className="lg:col-span-1">
        <AdminSidebar />
      </div>

      <div className="lg:col-span-5">
        <div className="card">
          <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
          {stats ? (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-4 bg-white border rounded">
                <div className="text-sm text-slate-500">Users</div>
                <div className="text-xl font-bold">{stats.total_users}</div>
              </div>
              <div className="p-4 bg-white border rounded">
                <div className="text-sm text-slate-500">Events</div>
                <div className="text-xl font-bold">{stats.total_events}</div>
              </div>
              <div className="p-4 bg-white border rounded">
                <div className="text-sm text-slate-500">Approved</div>
                <div className="text-xl font-bold">{stats.approved_events}</div>
              </div>
              <div className="p-4 bg-white border rounded">
                <div className="text-sm text-slate-500">Pending</div>
                <div className="text-xl font-bold">{stats.pending_events}</div>
              </div>
              <div className="p-4 bg-white border rounded">
                <div className="text-sm text-slate-500">Registrations</div>
                <div className="text-xl font-bold">{stats.total_registrations}</div>
              </div>
            </div>
          ) : (
            <div className="mt-4">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}
