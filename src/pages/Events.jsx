import React from "react";
import { Link } from "react-router-dom";

const Events = () => {
  return (
    <div>
      <div>this is event page</div>
      <Link to="/" className="underline">
        go to dashboard
      </Link>
    </div>
  );
};

export default Events;
