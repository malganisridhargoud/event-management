import React from "react";
import { Link } from "react-router-dom";

export default function EventCard({ e, showControls }) {
  const date = e?.date ? new Date(e.date).toLocaleString() : "TBD";
  return (
    <div className="card mb-4 flex gap-4 items-start">
      {e.image ? (
        <img src={e.image} alt={e.title} className="w-32 h-24 object-cover rounded" />
      ) : (
        <div className="w-32 h-24 bg-slate-100 rounded flex items-center justify-center text-slate-400">
          No image
        </div>
      )}

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{e.title}</h3>
            <div className="text-xs text-slate-500">{e.location} • {date}</div>
          </div>

          <div className="text-right">
            {e.approved ? (
              <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Approved</div>
            ) : (
              <div className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Pending</div>
            )}
            <div className="mt-2">
              <Link to={`/events/${e._id}`} className="text-sm px-3 py-1 bg-indigo-600 text-white rounded">View</Link>
            </div>
          </div>
        </div>

        <p className="mt-2 text-slate-700">{e.description?.slice(0, 180)}{e.description?.length > 180 ? "..." : ""}</p>

        {showControls && (
          <div className="mt-3 flex gap-2">
            <Link to={`/events/edit/${e._id}`} className="px-3 py-1 border rounded text-sm">Edit</Link>
            <button data-id={e._id} className="px-3 py-1 bg-red-600 text-white rounded text-sm">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}
