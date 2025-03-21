import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import config from "../config";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
const Dashboard = () => {
  const { SERVER_ADDRESS } = config;
  const { user } = useAuthContext();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${SERVER_ADDRESS}/api/dashboard`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => setData(res.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-3/4 bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full animate-pulse w-1/2"></div>
        </div>
      </div>
    );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Event Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Total Events</h2>
          <p className="text-3xl">{data.stats.totalEvents}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Total Workshops</h2>
          <p className="text-3xl">{data.stats.totalWorkshops}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Total Competitions</h2>
          <p className="text-3xl">{data.stats.totalCompetitions}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">
            Participation by Event Type
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.stats.participationData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
              >
                {data.stats.participationData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Event Trend Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.stats.trend}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 shadow rounded-lg mt-6">
        <h2 className="text-lg font-semibold mb-4">Number of Events by Type</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.stats.participationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
