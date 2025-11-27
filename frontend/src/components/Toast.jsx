import React, { useEffect, useState } from "react";

const ToastContextKey = "ems_toast_msg";

export function pushToast(msg, type = "info") {
  const payload = JSON.stringify({ msg, type, id: Date.now() });
  // use localStorage to broadcast
  localStorage.setItem(ToastContextKey, payload);
  // immediately remove to allow re-send
  setTimeout(() => localStorage.removeItem(ToastContextKey), 100);
}

export default function Toast() {
  const [t, setT] = useState(null);

  useEffect(() => {
    const handler = () => {
      const v = localStorage.getItem(ToastContextKey);
      if (!v) return;
      try {
        const parsed = JSON.parse(v);
        setT(parsed);
        setTimeout(() => setT(null), 4000);
      } catch {}
    };
    window.addEventListener("storage", handler);
    // also listen to custom event via polling
    const iv = setInterval(handler, 300);
    return () => {
      window.removeEventListener("storage", handler);
      clearInterval(iv);
    };
  }, []);

  if (!t) return null;
  const bg = t.type === "error" ? "bg-red-600" : "bg-indigo-600";
  return (
    <div className={`fixed right-6 top-6 z-50 ${bg} text-white px-4 py-2 rounded shadow`}>
      {t.msg}
    </div>
  );
}
