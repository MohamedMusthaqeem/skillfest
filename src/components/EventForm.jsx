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
  //form submission function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const neweve = {
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
    const res = await axios.post(`${SERVER_ADDRESS}/api/events`, neweve, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = res.data;
    if (!res.status) {
      setError(res.err.message);
    }
    if (res.status == 200) {
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
      dispatch({ type: "CREATE_EVENT", payload: data });
      console.log("new events added", res.data);
    }
  };
  // handle file upload
  const cloudname = "ddajwuci9";

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mohamed");
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
        formData
      )
      .then((res) => {
        setStatus(tick);
        setImage(res.data.secure_url);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div>
        <form className="space-y-3">
          <div className="flex flex-col w-1/2 space-x-2 ">
            <h1>Title:</h1>
            <input
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              className="py-1 px-2"
            />
          </div>
          <div className="flex flex-col  w-1/2 space-x-2">
            <h1>Description:</h1>
            <textarea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              className="py-1 px-2"
            />
          </div>
          <div className="flex flex-col  w-1/2 space-x-2">
            <h1>Image:</h1>
            <div className="flex space-x-1">
              <input type="file" onChange={handleFile} className="py-1 px-2" />
              <img src={status} alt="" className="h-8 bg-transparent" />
            </div>
          </div>
          <div className="flex flex-col  w-1/2 space-x-2">
            <h1>Date:</h1>
            <input
              type="date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
              value={date}
              className="py-1 px-2"
            />
          </div>
          <div className="flex flex-col  w-1/2 space-x-2">
            <h1>Time:</h1>
            <input
              type="time"
              onChange={(e) => {
                setTime(e.target.value);
              }}
              value={time}
              className="py-1 px-2"
            />
          </div>
          <div className="flex flex-col  w-1/2 space-x-2">
            <h1>Amount:</h1>
            <input
              type="number"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              value={amount}
              className="py-1 px-2"
            />
          </div>
          <div className="flex flex-col  w-1/2 space-x-2">
            <h1>First Prize</h1>
            <input
              type="number"
              onChange={(e) => {
                setFirst(e.target.value);
              }}
              value={first_prize}
              className="py-1 px-2"
            />
          </div>
          <div className="flex flex-col  w-1/2 space-x-2">
            <h1>Second Prize</h1>
            <input
              type="number"
              onChange={(e) => {
                setSecond(e.target.value);
              }}
              value={second_prize}
              className="py-1 px-2"
            />
          </div>
          <div className="flex flex-col  w-1/2 space-x-2">
            <h1>Third Prize</h1>
            <input
              type="number"
              onChange={(e) => {
                setThird(e.target.value);
              }}
              value={third_prize}
              className="py-1 px-2"
            />
          </div>
          <div className="flex flex-col  w-1/2 space-x-2">
            <h1>Support Number1:</h1>
            <input
              type="number"
              onChange={(e) => {
                setSupportone(e.target.value);
              }}
              value={supportnumone}
              className="py-1 px-2"
            />
          </div>
          <div className="flex flex-col  w-1/2 space-x-2">
            <h1>Support Number2:</h1>
            <input
              type="number"
              onChange={(e) => {
                setSupporttwo(e.target.value);
              }}
              value={supportnumtwo}
              className="py-1 px-2"
            />
          </div>
          <div className="flex flex-col  w-1/2 space-x-2">
            <h1>Venue</h1>
            <input
              type="text"
              onChange={(e) => {
                setVenue(e.target.value);
              }}
              value={venue}
              className="py-1 px-2"
            />
          </div>
          <div>
            <button
              className="p-2 rounded-md bg-blue-950 text-white cursor-pointer"
              onClick={handleSubmit}
            >
              Add Events
            </button>
            {error && <div>{error}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
