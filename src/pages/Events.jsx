import { useEffect } from "react";
import axios from "axios";
import EventForm from "../components/EventForm";
import { useEventContext } from "../hooks/useEventContext";
import Tempeve from "../components/Tempeve";
import { useAuthContext } from "../hooks/useAuthContext";
import config from "../config";

const Events = () => {
  const { SERVER_ADDRESS } = config;
  const { user } = useAuthContext();
  const { events, dispatch } = useEventContext();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${SERVER_ADDRESS}/api/events`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        dispatch({ type: "SET_EVENT", payload: res.data });
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvent();
  }, [dispatch, SERVER_ADDRESS, user.token]);

  return (
    <div className="min-h-screen bg-gray-100  flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Create New Event
        </h1>
        <EventForm />
      </div>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Created Events
        </h2>
        <div className="space-y-4">
          {events && events.length > 0 ? (
            events.map((event) => <Tempeve key={event._id} compet={event} />)
          ) : (
            <p className="text-gray-500 text-center">No events available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
