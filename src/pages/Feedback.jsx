import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import FeedComp from "../components/FeedComp";
import config from "../config";
const Feedback = () => {
  const { SERVER_ADDRESS } = config;
  const { user } = useAuthContext();
  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    const fetchRegister = async () => {
      const res = await axios.get(`${SERVER_ADDRESS}/api/events/getfed`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = res.data;
      if (res.status) {
        setFeedback(data);
        console.log(data);
      }
    };
    fetchRegister();
  }, []);
  return (
    <div>
      <div>
        {feedback.map((fed) => (
          <FeedComp
            key={fed.name}
            name={fed.name}
            year={fed.year}
            event_name={fed.event_name}
            phone_no={fed.phone_no}
            email={fed.email}
            college={fed.college}
            date={fed.date}
            time={fed.time}
            comment={fed.comment}
            commentedAt={fed.createdAt.slice(0, 10)}
          />
        ))}
      </div>
    </div>
  );
};

export default Feedback;
