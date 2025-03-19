import axios from "axios";
import React, { useState } from "react";
import { useEventContext } from "../hooks/useEventContext";
import tick from "../assets/tick.gif";
import { useAuthContext } from "../hooks/useAuthContext";
import config from "../config";

const EventForm = () => {
  const { SERVER_ADDRESS } = config;
  const { user } = useAuthContext();
  const { dispatch } = useEventContext();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageurl: "",
    date: "",
    time: "",
    amount: "",
    first_prize: "",
    second_prize: "",
    third_prize: "",
    supportnumone: "",
    supportnumtwo: "",
    venue: "",
  });

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${SERVER_ADDRESS}/api/events`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch({ type: "CREATE_EVENT", payload: res.data });
      setFormData({
        title: "",
        description: "",
        imageurl: "",
        date: "",
        time: "",
        amount: "",
        first_prize: "",
        second_prize: "",
        third_prize: "",
        supportnumone: "",
        supportnumtwo: "",
        venue: "",
      });
      setError(null);
    } catch (err) {
      setError("Failed to create event");
    }
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mohamed");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/ddajwuci9/image/upload`,
        formData
      );
      setStatus(tick);
      setFormData((prev) => ({ ...prev, imageurl: res.data.secure_url }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Create an Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map(
            (key) =>
              key !== "imageurl" && (
                <div key={key}>
                  <label className="block text-gray-600 capitalize">
                    {key.replace("_", " ")}
                  </label>
                  <input
                    type={
                      key.includes("date")
                        ? "date"
                        : key.includes("time")
                        ? "time"
                        : "text"
                    }
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )
          )}
          <div>
            <label className="block text-gray-600">Upload Image</label>
            <div className="flex items-center space-x-2">
              <input
                type="file"
                onChange={handleFile}
                className="p-2 border border-gray-300 rounded-lg"
              />
              {status && (
                <img src={status} alt="Upload success" className="h-8" />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Event
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default EventForm;
