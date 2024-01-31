import React from 'react'
import {useState} from 'react'
import { useWorkshopContext } from '../hooks/useWorkshopContext';
import axios from 'axios';

const Workform = () =>{
    const {dispatch}=useWorkshopContext();
    const [status, setStatus] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageurl, setImage] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [amount, setAmount] = useState("");
    const [no_of_hours, setHour] = useState("");
    const [no_of_days, setDay] = useState("");
    const [outcomes, setOutcomes] = useState("");
    const [incharge, setIncharge] = useState("");
    const [supportnumone, setSupportone] = useState("");
    const [supportnumtwo, setSupporttwo] = useState("");
    const [error, setError] = useState("");
    //form submission function
    const handleSubmit = async (e) => {
      e.preventDefault();
      const newwork = {
        title,
        description,
        imageurl,
        time,
        date,
        no_of_hours,
        no_of_days,
        outcomes,
        incharge,
        amount,
        supportnumone,
        supportnumtwo,
      };
      const res = await axios.post("http://localhost:5000/api/workshops", newwork, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.data;
      if (!res.status) {
        setError(res.err.message);
      }
      if (res.status) {
        setError(null);
        setTitle("");
        setAmount("");
        setDate("");
        setDescription("");
        setImage("");
        setTime("");
        setDate("");
        setDay("");
        setHour("");
        setIncharge("");
        setOutcomes("");
        setStatus("");
        setSupportone("");
        setSupporttwo("");
        dispatch({ type: "CREATE_WORKSHOP", payload: data });
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
          setStatus("✅");
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
              rows={5}
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
                <p>{status}</p>
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
              <h1>No.of.Hours</h1>
              <input
                type="number"
                onChange={(e) => {
                  setHour(e.target.value);
                }}
                value={no_of_hours}
                className="py-1 px-2"
              />
            </div>
            <div className="flex flex-col  w-1/2 space-x-2">
              <h1>No.of.Days:</h1>
              <input
                type="number"
                onChange={(e) => {
                  setDay(e.target.value);
                }}
                value={no_of_days}
                className="py-1 px-2"
              />
            </div>
            <div className="flex flex-col  w-1/2 space-x-2">
              <h1>Outcomes:</h1>
              <textarea
                 rows={5}
                type="text"
                onChange={(e) => {
                  setOutcomes(e.target.value);
                }}
                value={outcomes}
                className="py-1 px-2"
              />
            </div>
            <div className="flex flex-col  w-1/2 space-x-2">
              <h1>Incharge:</h1>
              <input
                type="text"
                onChange={(e) => {
                  setIncharge(e.target.value);
                }}
                value={incharge}
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
            <div>
              <button
                className="p-2 rounded-md bg-blue-950 text-white cursor-pointer"
                onClick={handleSubmit}
              >
                Add Workshop
              </button>
              {error && <div>{error}</div>}
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default Workform;