import axios from "axios";
import React, { useState } from "react";
import { useCompetitionContext } from "../hooks/useCompetitonContext";
import { useAuthContext } from "../hooks/useAuthContext";
import config from "../config";

const ComForm = () => {
  const { SERVER_ADDRESS } = config;
  const { user } = useAuthContext();
  const { dispatch } = useCompetitionContext();

  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageurl, setImage] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [time, setTime] = useState("");
  const [first_prize, setFirst] = useState("");
  const [second_prize, setSecond] = useState("");
  const [third_prize, setThird] = useState("");
  const [supportnumone, setSupportone] = useState("");
  const [supportnumtwo, setSupporttwo] = useState("");
  const [venue, setVenue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newcom = {
      title,
      description,
      imageurl,
      time,
      date,
      amount,
      first_prize,
      second_prize,
      third_prize,
      supportnumone,
      supportnumtwo,
      venue,
    };

    try {
      const res = await axios.post(`${SERVER_ADDRESS}/api/routes`, newcom, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.status === 200) {
        setError(null);
        setTitle("");
        setAmount("");
        setDate("");
        setDescription("");
        setImage("");
        setTime("");
        setFirst("");
        setSecond("");
        setThird("");
        setStatus("");
        setSupportone("");
        setSupporttwo("");
        setVenue("");
        dispatch({ type: "CREATE_COMPETITION", payload: res.data });
        console.log("New competition added", res.data);
      }
    } catch (error) {
      setError("Error adding competition. Please try again.");
    }
  };

  const cloudname = "ddajwuci9";

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mohamed");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
        formData
      );
      setStatus("✅");
      setImage(res.data.secure_url);
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Add Competition
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Description</label>
            <textarea
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Image</label>
            <input
              type="file"
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
              onChange={handleFile}
            />
            {status && <p className="text-green-500">{status}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Date</label>
              <input
                type="date"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Time</label>
              <input
                type="time"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Amount</label>
              <input
                type="number"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">First Prize</label>
              <input
                type="number"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
                value={first_prize}
                onChange={(e) => setFirst(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Second Prize</label>
              <input
                type="number"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
                value={second_prize}
                onChange={(e) => setSecond(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Third Prize</label>
              <input
                type="number"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
                value={third_prize}
                onChange={(e) => setThird(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Venue</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">
                Support Number 1
              </label>
              <input
                type="number"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
                value={supportnumone}
                onChange={(e) => setSupportone(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">
                Support Number 2
              </label>
              <input
                type="number"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
                value={supportnumtwo}
                onChange={(e) => setSupporttwo(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Add Competition
          </button>

          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ComForm;
