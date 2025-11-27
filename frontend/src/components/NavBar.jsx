import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { setAuthToken } from "../api/api";

export default function NavBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-semibold" style={{ color: "var(--brand)" }}>
            EventMgmt
          </Link>
          <Link to="/events" className="text-sm text-slate-600">Events</Link>
          {user?.role === "user" && <Link to="/create" className="text-sm text-slate-600">Create</Link>}
          {user && <Link to="/my-events" className="text-sm text-slate-600">My Events</Link>}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              {user.role === "admin" && <Link to="/admin" className="px-3 py-1 rounded bg-red-600 text-white text-sm">Admin</Link>}
              <div className="flex items-center gap-2">
                <div className="avatar">{user.name?.[0]?.toUpperCase()}</div>
                <div className="text-sm">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-slate-500">{user.role}</div>
                </div>
                <button onClick={logout} className="ml-4 px-3 py-1 text-sm text-red-600">Logout</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm">Login</Link>
              <Link to="/register" className="text-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
