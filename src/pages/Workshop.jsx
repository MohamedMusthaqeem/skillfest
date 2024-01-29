import React from "react";
import { useState } from "react";
const Workshop = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleAddTask = () => {
    if (title && image) {
      const newTask = {
        title,
        image,
        description,
        time,
        date,
        amount,
      };
      setTasks([...tasks, newTask]);
      setTitle("");
      setImage("");
      setDescription("");
      setTime("");
      setDate("");
      setAmount("");
    }
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setTitle(tasks[index].title);
    setImage(tasks[index].image);
    setDescription(tasks[index].description);
    setTime(tasks[index].time);
    setDate(tasks[index].date);
    setAmount(tasks[index].amount);
  };

  const handleSaveEdit = () => {
    if (title && image && editIndex !== -1) {
      const editedTasks = [...tasks];
      editedTasks[editIndex] = {
        title,
        image,
        description,
        time,
        date,
        amount,
      };
      setTasks(editedTasks);
      setEditIndex(-1);
      setTitle("");
      setImage("");
      setDescription("");
      setTime("");
      setDate("");
      setAmount("");
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(-1);
    setTitle("");
    setImage("");
    setDescription("");
    setTime("");
    setDate("");
    setAmount("");
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };
  return (
    <div>
      <h2 className="font-bold text-2xl mb-3">Create Workshops here!!</h2>
      <div className="m-2">
        <label className="">Name of the event :</label>
        <input
          className="p-1 rounded-md"
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="m-2">
        <label>Image URL:</label>
        <input
          className="p-1 rounded-md"
          type="text"
          value={image}
          onChange={handleImageChange}
        />
      </div>
      <div>
        <div className="m-2 flex">
          <label className="flex items-center">Description:</label>
          <textarea
            className="rounded-md p-2"
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="m-2">
          <label>Time:</label>
          <input
            className="p-1 rounded-md"
            type="text"
            value={time}
            onChange={handleTimeChange}
          />
        </div>
        <div className="m-2">
          <label>Date:</label>
          <input
            className="p-1 rounded-md"
            type="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <div className="m-2">
          <label>Amount</label>
          <input
            className="p-1 rounded-md"
            type="number"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
      </div>
      {editIndex !== -1 ? (
        <div>
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <button
          className="bg-[#071952] p-2 rounded-md text-white hover:scale-110 duration-150 active:bg-blue-700"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      )}
      <div>
        <h3 className="text-2xl font-bold my-2">Created Workshops:</h3>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {editIndex === index ? (
                <div>
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                  />
                  <input
                    type="text"
                    value={image}
                    onChange={handleImageChange}
                  />
                  <input
                    type="text"
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                  <input type="text" value={time} onChange={handleTimeChange} />
                  <input type="date" value={date} onChange={handleDateChange} />
                  <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                </div>
              ) : (
                <div className="border-4 border-gray-950 rounded-lg flex flex-row p-5 mx-36 bg-[#A6F6FF]">
                  <div className=" flex flex-col justify-center items-center">
                    <p className="text-2xl font-bold pt-0 pb-2">{task.title}</p>
                    <img
                      className="h-96 w-96 rounded-xl"
                      src={task.image}
                      alt={`Task ${index}`}
                    />
                  </div>
                  <div className="ml-5 mt-9">
                    <div className="">
                      <p className="font-bold text-xl">
                        Things you learn in this workshop :
                      </p>
                      <p className="text-md overflow-auto break-words h-44 w-96">
                        {task.description}
                      </p>
                    </div>
                    <p className="font-semibold">Timing:</p>
                    <p>{task.time}</p>
                    <p className="font-semibold">Date:</p>
                    <p>{task.date}</p>
                    <p className="font-semibold">Amount</p>
                    <div className="flex flex-row ">
                      <p>₹</p>
                      <p>{task.amount}</p>
                    </div>
                    <button className="bg-[#071952] p-2 m-2 rounded-md text-white hover:scale-110 duration-150 active:bg-blue-700">
                      Register!!
                    </button>
                  </div>
                </div>
              )}
              {editIndex === index ? (
                <div>
                  <button
                    className="bg-[#071952] p-2 m-2 rounded-md text-white hover:scale-110 duration-150 active:bg-blue-700"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </button>
                  <button
                    className="bg-[#071952] p-2 m-2 rounded-md text-white hover:scale-110 duration-150 active:bg-blue-700"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="bg-[#071952] p-2 rounded-md m-2 text-white hover:scale-110 duration-150 active:bg-blue-700"
                    onClick={() => handleEditTask(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-[#071952] p-2 rounded-md m-2 text-white hover:scale-110 duration-150 active:bg-blue-700"
                    onClick={() => handleDeleteTask(index)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Workshop;
