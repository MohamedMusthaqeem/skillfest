import React from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaPhone,
  FaUniversity,
  FaCommentDots,
} from "react-icons/fa";

const FeedComp = ({
  name,
  year,
  event_name,
  phone_no,
  email,
  college,
  date,
  time,
  comment,
  commentedAt,
}) => {
  return (
    <div className="w-full border-l-4 border-blue-500 pl-4 py-4 space-y-2 bg-gray-50 my-2">
      <div className="flex items-center space-x-2 text-gray-900 font-semibold">
        <FaUser className="text-blue-500" />
        <span>
          {name} ({year})
        </span>
      </div>
      <div className="flex items-center space-x-2 text-gray-700">
        <FaUniversity className="text-green-500" />
        <span>{college}</span>
      </div>
      <div className="flex items-center space-x-2 text-gray-700">
        <FaCalendarAlt className="text-red-500" />
        <span>{date}</span>
      </div>
      <div className="flex items-center space-x-2 text-gray-700">
        <FaClock className="text-yellow-500" />
        <span>{time}</span>
      </div>
      <div className="flex items-center space-x-2 text-gray-700">
        <FaEnvelope className="text-purple-500" />
        <span>{email}</span>
      </div>
      <div className="flex items-center space-x-2 text-gray-700">
        <FaPhone className="text-green-700" />
        <span>{phone_no}</span>
      </div>
      <div className="font-semibold text-gray-900">Event: {event_name}</div>
      <div className="relative group">
        <div className="text-gray-800 flex items-center space-x-2 italic group-hover:text-blue-600 transition">
          <FaCommentDots className="text-blue-500" />
          <span>{comment}</span>
        </div>
        <div className="absolute hidden group-hover:block left-0 mt-2 w-auto bg-white shadow-lg p-2 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">{comment}</p>
        </div>
      </div>
      <div className="text-xs text-gray-500 italic">
        Commented at: {commentedAt}
      </div>
    </div>
  );
};

export default FeedComp;
