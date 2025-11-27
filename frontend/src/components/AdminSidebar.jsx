import React from "react";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white shadow rounded p-4">
      <div className="mb-4 font-semibold">Admin</div>
      <ul className="space-y-2 text-sm">
        <li><Link to="/admin" className="block px-2 py-1 rounded hover:bg-slate-50">Dashboard</Link></li>
        <li><Link to="/admin/events" className="block px-2 py-1 rounded hover:bg-slate-50">Pending Events</Link></li>
        <li><Link to="/admin/users" className="block px-2 py-1 rounded hover:bg-slate-50">Users</Link></li>
        <li><Link to="/admin/registrations" className="block px-2 py-1 rounded hover:bg-slate-50">Registrations</Link></li>
      </ul>
    </aside>
  );
}
