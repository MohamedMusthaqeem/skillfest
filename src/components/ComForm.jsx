import React, { useState } from "react";
import axios from "axios";
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
      dispatch({ type: "CREATE_COMPETITION", payload: res.data });
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
    } catch (err) {
      setError("Failed to add competition");
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
      setStatus("✅");
      setImage(res.data.secure_url);
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Add Competition</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Title</label>
          <input
            className="border p-2 rounded-md"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Description</label>
          <textarea
            className="border p-2 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Image</label>
          <input
            className="border p-2 rounded-md"
            type="file"
            onChange={handleFile}
          />
          {status && <p className="text-green-500">{status}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Date</label>
            <input
              className="border p-2 rounded-md"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Time</label>
            <input
              className="border p-2 rounded-md"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Amount</label>
            <input
              className="border p-2 rounded-md"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Venue</label>
            <input
              className="border p-2 rounded-md"
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          type="submit"
        >
          Add Competition
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default ComForm;
