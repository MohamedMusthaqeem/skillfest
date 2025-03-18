import React from "react";

const ScrapeComp = ({
  imgsrc,
  url,
  startDate,
  status,
  title,
  type,
  viewsCount,
  subtype,
  festival,
  regions,
  organisation,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 max-w-md mx-auto border border-gray-200">
      <div className="flex items-center mb-4">
        <img src={imgsrc} alt="Logo" className="w-12 h-12 rounded-full mr-3" />
        <h3 className="text-xl font-bold flex-1">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-1">{organisation?.name}</p>
      <span className="text-xs text-green-600 font-semibold">{type}</span>

      <div className="mt-3">
        <p className="text-gray-700 text-sm">
          <span className="font-semibold">Start Date:</span>{" "}
          {startDate.slice(0, 10)}
        </p>
        <p className="text-gray-700 text-sm">
          <span className="font-semibold">End Date:</span>{" "}
          {festival?.end_date.slice(0, 10) || "End Date not available"}
        </p>
      </div>

      <p className="mt-2 text-gray-600 text-sm">
        <span className="font-semibold">Region:</span> {regions}
      </p>
      <p className="mt-2 text-gray-600 text-sm">
        <span className="font-semibold">Subtype:</span> {subtype}
      </p>
      <p className="mt-2 text-gray-600 text-sm">
        <span className="font-semibold">Registered Count:</span> {viewsCount}
      </p>

      <p
        className={`mt-2 text-sm font-semibold ${
          status === "LIVE" ? "text-green-500" : "text-red-500"
        }`}
      >
        {status}
      </p>

      <div className="mt-4 flex justify-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Visit Link
        </a>
      </div>
    </div>
  );
};

export default ScrapeComp;
