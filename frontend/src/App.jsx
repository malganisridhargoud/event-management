import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Toast from "./components/Toast";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import MyEvents from "./pages/MyEvents";
import MyRegistrations from "./pages/MyRegistrations";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminRegistrations from "./pages/admin/AdminRegistrations";

function RequireAuth({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar />
      <Toast />
      <main className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />

          <Route
            path="/create"
            element={
              <RequireAuth role="user">
                <CreateEvent />
              </RequireAuth>
            }
          />
          <Route
            path="/events/edit/:id"
            element={
              <RequireAuth role="user">
                <EditEvent />
              </RequireAuth>
            }
          />

          <Route
            path="/my-events"
            element={
              <RequireAuth>
                <MyEvents />
              </RequireAuth>
            }
          />
          <Route
            path="/my-registrations"
            element={
              <RequireAuth>
                <MyRegistrations />
              </RequireAuth>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <RequireAuth role="admin">
                <AdminDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/events"
            element={
              <RequireAuth role="admin">
                <AdminEvents />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/users"
            element={
              <RequireAuth role="admin">
                <AdminUsers />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/registrations"
            element={
              <RequireAuth role="admin">
                <AdminRegistrations />
              </RequireAuth>
            }
          />

          <Route path="*" element={<div className="card p-8">Page not found</div>} />
        </Routes>
      </main>
    </div>
  );
}
