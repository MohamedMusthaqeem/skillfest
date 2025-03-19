import React, { useState } from "react";
import { useWorkshopContext } from "../hooks/useWorkshopContext";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import config from "../config";

const Workform = () => {
  const { SERVER_ADDRESS } = config;
  const { user } = useAuthContext();
  const { dispatch } = useWorkshopContext();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageurl: "",
    date: "",
    end_date: "",
    time: "",
    amount: "",
    no_of_hours: "",
    no_of_days: "",
    outcomes: "",
    incharge: "",
    supportnumone: "",
    supportnumtwo: "",
    venue: "",
  });
  const [error, setError] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log("workshop", user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const res = await axios.post(
        `${SERVER_ADDRESS}/api/workshops`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = res.data;
      await dispatch({ type: "CREATE_WORKSHOP", payload: data });
      setFormData({
        title: "",
        description: "",
        imageurl: "",
        date: "",
        end_date: "",
        time: "",
        amount: "",
        no_of_hours: "",
        no_of_days: "",
        outcomes: "",
        incharge: "",
        supportnumone: "",
        supportnumtwo: "",
        venue: "",
      });
      setError("");
    } catch (err) {
      setError("Failed to add workshop or give correct type data");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData1 = new FormData();
    formData1.append("file", file);
    formData1.append("upload_preset", "mohamed");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/ddajwuci9/image/upload`,
        formData1
      );
      setUploadStatus("✅ Uploaded");
      setFormData({ ...formData, imageurl: res.data.secure_url });
    } catch (error) {
      setUploadStatus("❌ Upload failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Create Workshop
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Title", name: "title", type: "text" },
          { label: "Description", name: "description", type: "textarea" },
          { label: "Date", name: "date", type: "date" },
          { label: "End Date", name: "end_date", type: "date" },
          { label: "Time", name: "time", type: "time" },
          { label: "Amount", name: "amount", type: "number" },
          { label: "No. of Hours", name: "no_of_hours", type: "number" },
          { label: "No. of Days", name: "no_of_days", type: "number" },
          { label: "Outcomes", name: "outcomes", type: "textarea" },
          { label: "Incharge", name: "incharge", type: "text" },
          { label: "Support Number 1", name: "supportnumone", type: "number" },
          { label: "Support Number 2", name: "supportnumtwo", type: "number" },
          { label: "Venue", name: "venue", type: "text" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-gray-700 font-medium mb-1">
              {label}
            </label>
            {type === "textarea" ? (
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={4}
              ></textarea>
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            )}
          </div>
        ))}

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Image Upload
          </label>
          <input
            type="file"
            onChange={handleFileUpload}
            className="w-full p-2 border rounded"
          />
          <p className="text-sm text-green-600 mt-1">{uploadStatus}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Workshop
        </button>
        {error && <p className="text-red-600 text-center mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default Workform;
