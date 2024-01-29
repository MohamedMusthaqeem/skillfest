import { useEffect } from "react";
import axios from "axios";
import EventForm from "../components/EventForm";
import { useEventContext } from "../hooks/useEventContext";
import Tempeve from "../components/Tempeve";

const Events = () => {
  const { events, dispatch } = useEventContext();
  useEffect(() => {
    const fetchEvent = async () => {
      const res = await axios.get("http://localhost:5000/api/events");
      const data = res.data;
      if (res.status) {
        dispatch({ type: "SET_EVENT", payload: data });
        console.log(data);
      }
    };
    fetchEvent();
  }, []);
  return (
    <div>
      <div>
        <div>
          <p className="text-2xl font-bold font-poppins">Create New Events</p>
          <EventForm />
          <p className="text-2xl font-bold font-poppins sticky top-0">
            Created Events
          </p>
          {events &&
            events.map((event) => <Tempeve key={event._id} compet={event} />)}
        </div>
      </div>
    </div>
  );
};

export default Events;
