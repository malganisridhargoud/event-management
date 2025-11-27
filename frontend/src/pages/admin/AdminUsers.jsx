import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import api from "../../api/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => { (async ()=> {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data || []);
    } catch (err) {}
  })(); }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
      <div className="lg:col-span-1"><AdminSidebar /></div>

      <div className="lg:col-span-5">
        <div className="card">
          <h2 className="text-2xl font-semibold">Users</h2>
          <div className="mt-4">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-slate-500">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id} className="border-t">
                    <td className="py-2">{u.name}</td>
                    <td className="py-2">{u.email}</td>
                    <td className="py-2">{u.role}</td>
                    <td className="py-2">{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
