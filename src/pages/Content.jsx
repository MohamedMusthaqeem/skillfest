import React, { useEffect, useState } from "react";
import axios from "axios";
import ScrapeComp from "../components/ScrapeComp";
import config from "../config";

const Content = () => {
  const { SERVER_ADDRESS } = config;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_ADDRESS}/api/scrape`);
        setData(response.data.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Latest Scraped Content
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((scrape, index) => (
          <ScrapeComp
            key={index}
            imgsrc={scrape.logoUrl2}
            url={scrape.seo_url}
            startDate={scrape.start_date}
            status={scrape.status}
            title={scrape.title}
            type={scrape.type}
            viewsCount={scrape.viewsCount}
            subtype={scrape.subtype}
            festival={scrape.festival}
            regions={scrape.region}
            organisation={scrape.organisation}
          />
        ))}
      </div>
    </div>
  );
};

export default Content;
