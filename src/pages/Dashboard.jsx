import React from "react";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <div>
      <h1>This a Dashboard</h1>
      <Link to="/Events">go to events</Link>
    </div>
  );
};

export default Dashboard;
