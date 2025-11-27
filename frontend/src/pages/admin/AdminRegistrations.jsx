import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import api from "../../api/api";

export default function AdminRegistrations() {
  const [regs, setRegs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/admin/registrations");
        setRegs(res.data || []);
      } catch (err) {}
    })();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
      <div className="lg:col-span-1"><AdminSidebar /></div>

      <div className="lg:col-span-5">
        <div className="card">
          <h2 className="text-2xl font-semibold">Registrations</h2>
          <div className="mt-4 space-y-3">
            {regs.length === 0 ? <div className="card">No registrations</div> : regs.map(r => (
              <div key={r._id} className="card flex justify-between items-center">
                <div>
                  <div className="font-semibold">{r.event?.title}</div>
                  <div className="text-sm text-slate-500">{r.user?.name} — {new Date(r.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-sm text-slate-500">{r.user?.email}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
