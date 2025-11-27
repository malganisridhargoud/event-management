import React, { useEffect, useState } from "react";
import api from "../api/api";
import EventCard from "../components/EventCard";

export default function EventList(){
  const [events, setEvents] = useState([]);

  useEffect(()=>{
    (async ()=> {
      const res = await api.get("/events?approved=true");
      setEvents(res.data);
    })();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Events</h2>
      {events.length === 0 ? <div className="card">No events yet</div> : events.map(e=> <EventCard key={e._id} e={e} />)}
    </div>
  );
}
